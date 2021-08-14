import {Scenes} from 'telegraf';
import MyContext from "../../types/IMyContext";
import * as basketballController from "../../controllers/basketball";

// Echo scene
const basketballEnterScene = new Scenes.BaseScene<MyContext>('basketball-enter');

// Enter message
basketballEnterScene.enter(basketballController.enter);
basketballEnterScene.on('message', basketballController.setRoomMaxScore);
basketballEnterScene.on("callback_query", basketballController.callback_query)

export default basketballEnterScene;
