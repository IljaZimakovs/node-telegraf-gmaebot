import { Context } from 'telegraf';

export const errorHandler = (err: Error, ctx: Context) => {
  console.error(`Error handling update ${ctx.updateType}:`, err);
  ctx.reply('❌ An unexpected error occurred. Please try again later.');
};
