import {Scenes, session, Telegraf} from 'telegraf'
import * as dotenv from "dotenv";
import echoScene from "./controllers/echo";
import MyContext from "./controllers/IMyContext";

// Configure 'dotenv'
dotenv.config();
const token = process.env.BOT_TOKEN
if (token === undefined) {
    throw new Error('BOT_TOKEN must be provided!')
}

// Create bot instance
const bot = new Telegraf<MyContext>(token);

// Create new stage with all scenes
const stage = new Scenes.Stage<MyContext>([echoScene])

// Middleware
bot.use(session());
bot.use(stage.middleware());

// Handlers
//
// '/start' greeting
bot.start((ctx: MyContext) => ctx.reply('Hello!'));
// '/echo' Echo bot
bot.command('echo', (ctx: MyContext) => ctx.scene.enter('echo'))

// Launch bot
bot.launch().then(() => console.log('Bot is ONLINE'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))