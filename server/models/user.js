import mongoose from "mongoose";
import Parts from "./parts.js";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    score: {
        type: Number,
        default: 0
    },
    parts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Parts"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);

