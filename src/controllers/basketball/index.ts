import {Markup, Scenes} from 'telegraf';
import MyContext from "../../types/IMyContext";
import {deleteMessage, getPlayer, getRoom, IChat, IUser, timeoutMessage} from "./util";
import logger from "../../util/logger";

// Inline keyboard markup, that shows
// itself when enter 'basketball' scene
const enterReplyOptions = Markup.inlineKeyboard([
    Markup.button.callback('Join', 'join'),
    Markup.button.callback('Start', 'start'),
])

// Echo scene
const basketballScene = new Scenes.BaseScene<MyContext>('basketball');

// Enter message
basketballScene.enter(async (ctx: MyContext) => {
    await ctx.reply('Basketball scene greeting', enterReplyOptions);

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
});
// Leave message
basketballScene.leave((ctx) => ctx.reply('Basketball scene leave'));
// Handle exit command
basketballScene.command('exit', Scenes.Stage.leave<MyContext>());
// Dice handler
basketballScene.on('dice', (ctx) => {
    // If dice emoji is basketball
    if (ctx.message.dice.emoji === '🏀') {
        // Extract value from dice result
        const {value} = ctx.message.dice;
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
});
basketballScene.on("callback_query", (ctx) => {
    logger.info(ctx);
    logger.info(ctx.callbackQuery.from.id);
})
// Delete all other messages
basketballScene.on('message', deleteMessage);


export default basketballScene;