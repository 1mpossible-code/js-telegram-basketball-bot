import MyContext from "../../types/IMyContext";
import Player, {IPlayer} from "../../models/Player";

export interface IUser {
    _id: string,
    name: string
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
export const createPlayer = async (user: IUser) => {
    return await Player.findOne({_id: user._id}) ?? await Player.create(<IPlayer>{
        _id: user._id,
        name: user.name,
        score: 0,
    })
}