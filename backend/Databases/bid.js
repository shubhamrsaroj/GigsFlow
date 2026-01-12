import mongoose from "mongoose";

const BidSchema = new mongoose.Schema({
    gigId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gig"
    },
    freelancerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "hired", "rejected"],
        default: "pending"
    }
});

export default mongoose.model("Bid", BidSchema);