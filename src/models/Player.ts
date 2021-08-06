import {Schema, model} from "mongoose";

const playerSchema = new Schema({
    _id: Number,
    name: String,
    score: Number,
});

export default model('Player', playerSchema);