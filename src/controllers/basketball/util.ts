import MyContext from "../../types/IMyContext";
import {Markup} from "telegraf";

/**
 * Delete message aster 5000 ms.
 * @param ctx
 * @param timeout
 */
export const deleteMessageWithTimeout = (ctx: MyContext, timeout: number = 5000) => {
    setTimeout(async () => {
        await ctx.deleteMessage();
    }, timeout);
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

export const sendAutoDeleteMessage = async (ctx: MyContext, message: string, timeout: number = 5000) => {
    // Send a message and then delete it with specified timeout
    const sentMessage = await ctx.reply(message);
    setTimeout(async () => {
        await ctx.deleteMessage(sentMessage.message_id);
    }, timeout)
}