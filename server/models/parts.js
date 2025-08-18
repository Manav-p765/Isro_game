import mongoose from "mongoose";

const { Schema } = mongoose;

const partSchema = new Schema({
    engine: [
        {
            name: {
                type: String,
                required: true
            },
            points: Number,
        }
    ],
    body: [
        {
            name: {
                type: String,
                required: true
            },
            points: Number,
        }
    ],
    fuel: [
        {
            name: {
                type: String,
                required: true
            },
            points: Number,
        }
    ],
});

const Parts = mongoose.model("Parts", partSchema);

export default Parts;
