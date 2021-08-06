import {config} from "./config";
import {Scenes, session, Telegraf} from 'telegraf'
import echoScene from "./controllers/echo";
import MyContext from "./controllers/IMyContext";
import basketballScene from "./controllers/basketball";
import mongoose from "mongoose";

// Create bot instance
const bot = new Telegraf<MyContext>(config.token);

// Connect to database using 'DB_URI' env property with mongoose
mongoose.connect(config.dbURI)
    .then(() => console.log('Database Connected'))
    .catch(err => console.error(err));

// Create new stage with all scenes
const stage = new Scenes.Stage<MyContext>([
    echoScene, basketballScene,
])

// Middleware
bot.use(session());
bot.use(stage.middleware());

// Handlers
//
// '/start' greeting
bot.start((ctx: MyContext) => ctx.reply('Hello!'));
// '/echo' Echo bot
bot.command('echo', (ctx: MyContext) => ctx.scene.enter('echo'))
// '/basketball' Start basketball game
bot.command('basketball', (ctx: MyContext) => {
    ctx.scene.enter('basketball');
})

// Launch bot
bot.launch().then(() => console.log('Bot is ONLINE'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))