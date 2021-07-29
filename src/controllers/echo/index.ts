import { Context, Scenes } from 'telegraf'
import MyContext from "../IMyContext";

// Handler factories
const { leave } = Scenes.Stage
// Echo scene
const echoScene = new Scenes.BaseScene<MyContext>('echo')
echoScene.enter((ctx) => ctx.reply('echo scene'))
echoScene.leave((ctx) => ctx.reply('exiting echo scene'))
echoScene.command('back', leave<MyContext>())
echoScene.on('text', (ctx) => ctx.reply(ctx.message.text))
echoScene.on('message', (ctx) => ctx.reply('Only text messages please'))

export default echoScene;