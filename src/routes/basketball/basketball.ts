import {Scenes} from 'telegraf';
import MyContext from "../../types/IMyContext";
import * as basketballController from "../../controllers/basketball";


// Init basketball scene
const basketballGameScene = new Scenes.BaseScene<MyContext>('basketball-game');

// Leave message
basketballGameScene.leave(basketballController.leave);
// Handle exit command
basketballGameScene.command('exit', basketballController.exit);
// Dice handler
basketballGameScene.on('dice', basketballController.dice);
// Delete all other messages
basketballGameScene.on('message', basketballController.message);


export default basketballGameScene;