import express from "express";
import UserSchema from "../Databases/user.js";
import GigSchema from "../Databases/gig.js";
import BidSchema from "../Databases/bid.js";
import NotificationSchema from "../Databases/notification.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import protect from "../ProtectMiddleware/jwtAuth.js";
import { io, userSocketMap } from "../server.js";

const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const checkUser = await UserSchema.findOne({ email });

    if (checkUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserSchema.create({ name, email, password: hashedPassword });

    const jsonwebtoken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    await newUser.save();

    res.status(200).json({ message: "User registered successfully", token: jsonwebtoken, user: { id: newUser._id, name: newUser.name, email: newUser.email } });

});

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
        return res.status(400).json({ message: "Incorrect password" });
    }

    const jsonwebtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    await user.save();

    res.status(200).json({ message: "User logged in successfully", token: jsonwebtoken, user: { id: user._id, name: user.name, email: user.email } });
});

router.post("/gigs", protect, async (req, res) => {

    const { title, description, budget } = req.body;

    try {
        const newGig = await GigSchema.create({
            title,
            description,
            budget,
            ownerId: req.user._id
        });

        await newGig.save();
        res.status(200).json({ message: "Gig created successfully", gig: newGig });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.get("/gigs", protect, async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};

        if (search) {
            query.title = { $regex: search, $options: "i" };
        }
        const gigs = await GigSchema.find(query).populate("ownerId", "name email");
        res.status(200).json(gigs);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


router.get("/gigs/:id", protect, async (req, res) => {
    try {
        const { id } = req.params;
        const gig = await GigSchema.findById(id).populate("ownerId", "name email");
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }
        res.status(200).json(gig);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.post("/bids", protect, async (req, res) => {

    const { gigId, message } = req.body;

    try {
        const gig = await GigSchema.findById(gigId);
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        if (gig.ownerId.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: "You cannot bid on your own gig" });
        }

        const newBid = await BidSchema.create({
            gigId,
            freelancerId: req.user._id,
            message,
        });

        await newBid.save();

        res.status(200).json({ message: "Bid created successfully", bid: newBid });

    }
    catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message })
    }
})

router.get("/bids/:gigId", protect, async (req, res) => {

    const { gigId } = req.params;

    try {

        const bids = await BidSchema.find({ gigId }).populate("freelancerId", "name email");

        res.status(200).json(bids);

    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }


});

router.patch("/bids/:bidId/hire", protect, async (req, res) => {
    const { bidId } = req.params;

    try {
        const bid = await BidSchema.findById(bidId);
        if (!bid) {
            return res.status(404).json({ message: "Bid not found" });
        }

        const gig = await GigSchema.findById(bid.gigId);
        if (!gig) {
            return res.status(404).json({ message: "Gig not found" });
        }

        if (gig.ownerId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized: You are not the owner of this gig" });
        }

        const updatedGig = await GigSchema.findOneAndUpdate(
            { _id: gig._id, status: "open" },
            { status: "assigned" },
            { new: true }
        );

        if (!updatedGig) {
            return res.status(400).json({ message: "Gig is not open or already assigned" });
        }

        bid.status = "hired";


        // Reject all other bids for this gig
        await BidSchema.updateMany(
            { gigId: gig._id, _id: { $ne: bidId } },
            { status: "rejected" }
        );


        // Send Real-time Notification
        const freelancerSocketId = userSocketMap[bid.freelancerId];
        const message = `You have been hired for the gig: ${gig.title}!`;

        if (freelancerSocketId) {
            io.to(freelancerSocketId).emit("hire_notification", {
                message
            });
        }
        // Save Notification to Database
        await NotificationSchema.create({
            userId: bid.freelancerId,
            message
        });

        await bid.save();

        res.status(200).json({ message: "Bid accepted successfully", gig: updatedGig, bid });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


router.get("/notifications", protect, async (req, res) => {
    try {
        const notifications = await NotificationSchema.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user);
});

export default router;