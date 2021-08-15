import {Scenes} from 'telegraf';
import MyContext from "../../types/IMyContext";
import {deleteMessage, getEnterReplyOptions, timeoutMessage} from "./util";
import * as PlayerService from "../../services/PlayerService";
import * as RoomService from "../../services/RoomService";
import logger from "../../util/logger";
import {checkIfWin, IDice} from "../../services/DiceService";
import {IPlayer} from "../../models/Player";
import Room from "../../models/Room";


/**
 * Handle enter route.
 * Reply with two buttons: 'start' and 'join'. Get or create
 * new room with owner (user that started basketball)
 * @param ctx
 */
export const enter = async (ctx: MyContext) => {
    await ctx.reply('Basketball scene greeting', getEnterReplyOptions());

    const user: PlayerService.IUser = {
        _id: String(ctx.from?.id),
        name: String(ctx.from?.first_name),
    };

    const owner = await PlayerService.getPlayer(user);

    logger.debug(owner);

    const chat: RoomService.IChat = {
        _id: String(ctx.chat?.id),
        owner: owner,
    };

    const room = await RoomService.getRoom(chat);

    logger.debug(room);
};

/**
 * Handle messages in enter router.
 * Verify if the message type is number. Also check specified range (0-10).
 * Delete all other types of messages with delay of 5 sec
 * @param ctx
 */
export const setRoomMaxScore = async (ctx: MyContext) => {
    // @ts-ignore
    const numberText = ctx.message.text;
    const isDigit = /^[0-9]+$/.test(numberText);
    // Check if the text is number and if the number is <= 10 and >= 0
    if (isDigit && parseInt(numberText) <= 10 && parseInt(numberText) >= 0) {
        await ctx.reply(`Ok. Max score in this game is ${numberText}`);
    } else if (isDigit) {
        await ctx.reply('I think the score is too high. Try again');
    } else {
        deleteMessage(ctx)
        // Send a message and then delete it in 5 sec
        const message = await ctx.reply('You need to specify a number to set max score.')
        setTimeout(async () => {
            await ctx.deleteMessage(message.message_id);
        }, 5000)
    }
}

/**
 * Handle callback queries in enter router.
 * @param ctx
 */
export const callback_query = async (ctx: MyContext) => {
    // @ts-ignore because callbackQuery hasn't
    // data in interface from telegraf lib
    const {data} = ctx.callbackQuery;

    const user: PlayerService.IUser = {
        _id: String(ctx.from?.id),
        name: String(ctx.from?.first_name),
    };

    const chat: RoomService.IChat = {
        _id: String(ctx.chat?.id),
    }

    switch (data) {
        case 'join':
            logger.debug('join callback query');

            const result = await RoomService.addPlayerToRoom(chat, user);

            if (result) {
                await ctx.answerCbQuery('Joined the room successfully!')
            } else {
                await ctx.answerCbQuery('You are already in the room!')
            }
            break;
        case 'start':
            logger.debug('start callback query');
    }
}


export const leave = (ctx: MyContext) => ctx.reply('Basketball scene leave');
// Handle exit command
export const exit = () => {
    Scenes.Stage.leave<MyContext>();
};
/**
 * Handle dice messages in basketball router.
 * Check if the dice result's value is winning one.
 * Send the result message with result text after little delay
 * @param ctx
 */
export const dice = (ctx: MyContext) => {
    // @ts-ignore because dice is not supported
    // with MyContext created with documentation
    // from Telegraf
    const dice: IDice = ctx.message.dice
    // Check if dice is winning one
    if (checkIfWin(dice)) {
        timeoutMessage(ctx, 'You win', 4000);
    } else {
        timeoutMessage(ctx, 'You lose', 4000);
    }
}
// Delete all other messages
export const message = (ctx: MyContext) => {
    deleteMessage(ctx)
}