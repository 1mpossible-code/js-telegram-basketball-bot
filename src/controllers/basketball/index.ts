import {Scenes} from 'telegraf';
import MyContext from "../../types/IMyContext";
import {deleteMessage, getEnterReplyOptions, getPlayer, getRoom, IChat, IUser, timeoutMessage} from "./util";
import logger from "../../util/logger";


// Handle enter routes
export const enter = async (ctx: MyContext) => {
    await ctx.reply('Basketball scene greeting', getEnterReplyOptions());

    const user: IUser = {
        _id: String(ctx.from?.id),
        name: String(ctx.from?.first_name),
    };

    const owner = await getPlayer(user);

    logger.debug(owner);

    const chat: IChat = {
        _id: String(ctx.chat?.id),
        owner: owner,
    };

    const room = await getRoom(chat);

    logger.debug(room);
};

export const setRoomMaxScore = async (ctx: MyContext) => {}


export const leave = (ctx: MyContext) => ctx.reply('Basketball scene leave');
// Handle exit command
export const exit = () => {
    Scenes.Stage.leave<MyContext>();
};
// Dice handler
export const dice = (ctx: MyContext) => {
    // @ts-ignore because dice is not supported
    // with MyContext created with documentation
    // from Telegraf
    const dice = ctx.message.dice
    // Extract value and emoji from dice result
    const {value, emoji} = dice;
    // If dice emoji is basketball
    if (emoji === '🏀') {
        logger.debug(`The dice rolled up with value: ${value}`);
        // Value '5' is the winning value, so everything
        // else is losing values
        //
        // Set timeout to send message about the
        // dice status after the animation
        if (value === 5 || value === 4) {
            timeoutMessage(ctx, 'You win', 4000);
        } else {
            timeoutMessage(ctx, 'You lose', 4000);
        }
    }
}
export const callback_query = (ctx: MyContext) => {
    logger.info(ctx);
}
// Delete all other messages
export const message = (ctx: MyContext) => {
    deleteMessage(ctx)
}