import mongoose from "mongoose";

const GigSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ["open", "assigned"],
        default: "open"
    },
    timeStamps: {
        type: Date,
        default: Date.now
    }


});

export default mongoose.model("Gig", GigSchema);