import mongoose, {Document} from "mongoose";

export interface IPlayer extends Document {
    _id: string,
    name: string,
    score: number,
}

export const PlayerSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    score: Number,
});

const Player = mongoose.model<IPlayer>('Player', PlayerSchema);
export default Player;