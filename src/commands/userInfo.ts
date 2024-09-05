import { Context } from 'telegraf';
import { getUserById } from '../services/userService';

export const handleUserInfo = async (ctx: Context) => {
  const userId = ctx.from?.id;

  if (!userId) return ctx.reply('❌ Error: Unable to retrieve user ID.');

  try {
    const user = await getUserById(userId);
    if (user) {
      ctx.reply(`👤 *User Information*\n\n- Name: ${user.username}\n- Balance: ${user.balance} points\n- Status: ${user.status}`);
    } else {
      ctx.reply('❌ User not found.');
    }
  } catch (error) {
    ctx.reply('❌ Unable to fetch user information at the moment.');
  }
};
