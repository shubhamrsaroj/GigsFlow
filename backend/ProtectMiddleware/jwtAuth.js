import UserSchema from "../Databases/user.js";
import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {

    try {

        let token = req.cookies.jwt;

        if (!token && req.headers.authorization && req.headers.authorization.includes("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (token) {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await UserSchema.findById(decoded.id).select("-password");

            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;

            next();

        }
        else {
            return res.status(401).json({ message: "Unauthorized" });
        }

    }
    catch (err) {
        console.log(err);

        return res.status(401).json({ message: "Unauthorized" });
    }


};

export default protect;