import {IPlayer} from "../models/Player";
import Room, {IRoom} from "../models/Room";

export interface IChat {
    _id: string,
    owner?: IPlayer,
}

export const getRoom = async (chat: IChat) => {
    return await Room.findOne({_id: chat._id}) ?? await Room.create(<IRoom>{
        _id: chat._id,
        owner: chat.owner,
        maxScore: 0,
        players: [chat.owner],
        turn: 0,
        createdAt: new Date().valueOf(),
        updatedAt: new Date().valueOf(),
    })
}

export const updateRoom = async (id: number | string, data: Object) => {
    return Room.updateOne({_id: String(id)}, {
        ...data,
        updatedAt: new Date().valueOf(),
    });
}
