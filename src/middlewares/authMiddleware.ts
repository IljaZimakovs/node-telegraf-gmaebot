import { Context, MiddlewareFn } from 'telegraf';
import { getUserById } from '../services/userService';

// Authentication middleware to verify that the user is authorized
export const authMiddleware: MiddlewareFn<Context> = async (ctx, next) => {
  // Get user ID from the context
  const userId = ctx.from?.id;

  if (!userId) {
    ctx.reply('❌ Error: Unable to retrieve user details.');
    return;
  }

  try {
    // Fetch the user from the database
    const user = await getUserById(userId);

    // Check if the user exists and is authorized to use the bot
    if (!user) {
      ctx.reply('❌ You are not authorized to use this bot. Please register first.');
      return;
    }

    // If the user is authorized, proceed to the next middleware or handler
    return next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    ctx.reply('❌ An error occurred while checking your authorization. Please try again later.');
  }
};
