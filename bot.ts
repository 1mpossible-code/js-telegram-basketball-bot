import {Telegraf} from 'telegraf'
import * as dotenv from "dotenv";

// Configure 'dotenv'
dotenv.config();

// Create bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

// Start command handler
bot.start(ctx => ctx.reply('Hello!'));

// Launch bot
bot.launch().then(() => console.log('Bot is ONLINE'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))