import MyContext from "../../types/IMyContext";
import Player, {IPlayer} from "../../models/Player";
import Room, {IRoom} from "../../models/Room";
import {Markup} from "telegraf";


export interface IChat {
    _id: string,
    owner?: IPlayer,
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

export const getEnterReplyOptions = () => {
    // Inline keyboard markup, that shows
    // itself when enter 'basketball' scene
    return Markup.inlineKeyboard([
        Markup.button.callback('Join', 'join'),
        Markup.button.callback('Start', 'start'),
    ])
}