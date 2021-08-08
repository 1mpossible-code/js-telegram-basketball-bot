import MyContext from "../../types/IMyContext";
import Player, {IPlayer} from "../../models/Player";
import Room, {IRoom} from "../../models/Room";

export interface IUser {
    _id: string,
    name: string
}

export interface IChat {
    _id: string,
    owner: IPlayer,
}

/**
 * Delete message aster 5000 ms.
 * @param ctx
 */
export const deleteMessage = (ctx: MyContext) => {
    setTimeout(async () => {
        await ctx.deleteMessage();
    }, 5000);
}

/**
 * Create or find player from db
 * @param user
 */
export const getPlayer = async (user: IUser) => {
    return await Player.findOne({_id: user._id}) ?? await Player.create(<IPlayer>{
        _id: user._id,
        name: user.name,
        score: 0,
    })
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
 * Send message with timeout
 * @param ctx
 * @param message
 * @param timeout
 */
export const timeoutMessage = (ctx: MyContext, message: string, timeout: number): void => {
    setTimeout(
        () => ctx.reply(message), timeout
    );
}