import { Context } from 'telegraf';
import { getUserById, createUser } from '../services/userService';

export const startHandler = async (ctx: Context) => {
  const userId = ctx.from?.id;
  const userName = ctx.from?.first_name;

  if (!userId || !userName) return ctx.reply('❌ Error: Unable to retrieve user details.');

  try {
    let user = await getUserById(userId);

    if (!user) {
      user = await createUser(userId, userName);
    }

    ctx.reply(`👋 Welcome back, ${userName}!\nHere’s what’s new:\n\n🔔 Your Updates:\n- New Members: 3\n- Recent Earnings: 250 points\n- Current rewards balance: ${user.balance} points.`, {
      reply_markup: {
        keyboard: [
          [{ text: "🎮 Play Now" }],
          [{ text: "💬 My Community" }, { text: "🎁 Rewards" }],
          [{ text: "📩 Invite a Friend" }]
        ],
        resize_keyboard: true
      }
    });
  } catch (error) {
    console.error('Error fetching or creating user:', error);
    ctx.reply('❌ An error occurred while fetching your data. Please try again later.');
  }
};
