import {IPlayer} from "../models/Player";
import Room, {IRoom} from "../models/Room";
import logger from "../util/logger";

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

/**
 * Add player to room and return true if player
 * has been added, in other cases return false.
 * @param roomId
 * @param player
 * @return boolean
 */
export const addPlayerToRoom = async (roomId: number | string, player: IPlayer) => {
    // Get room
    const room = await Room.findOne({_id: String(roomId)}).populate('players');
    // Check if user index not exists
    if (room && room.players.findIndex(x => x._id === player._id) === -1) {
        // Push player to players array
        room.players.push(player);
        // Save document
        await room.save();
        logger.info(`Added player ${player._id} to room with _id: ${room._id}`)
        return true
    }
    return false
}
