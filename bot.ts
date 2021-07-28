import {Telegraf} from 'telegraf'
import * as dotenv from "dotenv";

// Configure 'dotenv'
dotenv.config();

// Create bot instance
const bot = new Telegraf(process.env.BOT_TOKEN);

// Start command handler
bot.start(ctx => ctx.reply('Hello!'));

// Basketball dice handler
bot.on('dice', (ctx) => {
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

// Launch bot
bot.launch().then(() => console.log('Bot is ONLINE'));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))