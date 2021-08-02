import MyContext from "../IMyContext";

/**
 * Delete message aster 5000 ms.
 * @param ctx
 */
export const deleteMessage = (ctx: MyContext) => {
    setTimeout(() => {
        ctx.deleteMessage();
    }, 5000);
}
