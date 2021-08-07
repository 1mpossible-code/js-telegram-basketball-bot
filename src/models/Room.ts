import mongoose, {Document} from "mongoose";
import {IPlayer} from "./Player";

export interface IRoom extends Document {
    _id: string,
    owner: IPlayer,
    maxScore: number,
    players: IPlayer[],
    turn: number,
    createdAt: number,
    updatedAt: number,
}

const RoomSchema = new mongoose.Schema({
    _id: String,
    owner: {
        type: String,
        ref: 'Player',
    },
    maxScore: Number,
    players: [{
        type: String,
        ref: 'Player',
    }],
    turn: Number,
    createdAt: Date,
    updatedAt: Date,
});

const Room = mongoose.model<IRoom>('Room', RoomSchema);
export default Room;