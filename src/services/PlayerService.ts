import Player, {IPlayer} from "../models/Player";

export interface IUser {
    _id: string,
    name: string
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
