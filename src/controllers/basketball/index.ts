import {Scenes, Markup} from 'telegraf';
import MyContext from "../IMyContext";
import {deleteMessage} from "./util";

// Inline keyboard markup, that shows
// itself when enter 'basketball' scene
const enterReplyOptions = Markup.inlineKeyboard([
    Markup.button.callback('Join', 'join'),
    Markup.button.callback('Start', 'start'),
])

// Handler factories
const {leave} = Scenes.Stage;
// Echo scene
const basketballScene = new Scenes.BaseScene<MyContext>('basketball');

// Enter message
basketballScene.enter((ctx) => ctx.reply('Basketball scene greeting', enterReplyOptions));
// Leave message
basketballScene.leave((ctx) => ctx.reply('Basketball scene leave'));
// Handle exit command
basketballScene.command('exit', leave<MyContext>());
// Dice handler
basketballScene.on('dice', (ctx) => {
    // If dice emoji is basketball
    if (ctx.message.dice.emoji === '🏀') {
        // Value '5' is the winning value, so everything
        // else is losing values
        //
        // Set timeout to send message about the
        // dice status after the animation
        if (ctx.message.dice.value === 5) {
            setTimeout(
                () => ctx.reply('You win'), 2500
            )
        } else {
            setTimeout(
                () => ctx.reply('You lose'), 2500
            )
        }
    }
});
// Delete all other messages
basketballScene.on('message', deleteMessage);


export default basketballScene;