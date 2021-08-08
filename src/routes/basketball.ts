import {Scenes} from 'telegraf';
import MyContext from "../types/IMyContext";
import * as basketballController from "../controllers/basketball";


// Echo scene
const basketballScene = new Scenes.BaseScene<MyContext>('basketball');

// Enter message
basketballScene.enter(basketballController.enter);
// Leave message
basketballScene.leave(basketballController.leave);
// Handle exit command
basketballScene.command('exit', basketballController.exit);
// Dice handler
basketballScene.on('dice', basketballController.dice);
basketballScene.on("callback_query", basketballController.callback_query)
// Delete all other messages
basketballScene.on('message', basketballController.message);


export default basketballScene;