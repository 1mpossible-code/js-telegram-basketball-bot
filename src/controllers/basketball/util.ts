import MyContext from "../../types/IMyContext";
import {Markup} from "telegraf";

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