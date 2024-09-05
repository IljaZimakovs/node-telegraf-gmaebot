const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const sequelize = require('./db/connection');
const { startHandler } = require('./handlers/startHandler');
const { messageHandler } = require('./handlers/messageHandler');
const { callbackQueryHandler } = require('./handlers/callbackQueries');
const { errorHandler } = require('./handlers/errorHandler');

// Load environment variables
dotenv.config();

// Initialize the bot
const bot = new Telegraf(process.env.TELEGRAM_API_TOKEN);

// Set up database connection
sequelize
  .sync()
  .then(() => {
    console.log('Database connected successfully');
  })


// Set up bot handlers
bot.start(startHandler);
bot.on('message', messageHandler);
bot.on('callback_query', callbackQueryHandler);
// bot.catch(errorHandler);

// Start the bot
bot.launch();

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
