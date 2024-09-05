import { Context } from 'telegraf';
import { getUserById, updateUser } from '../services/userService';
import { getLeaderboard } from '../services/mlmService';

export const handleCommunity = async (ctx: Context) => {
  const userId = ctx.from?.id;

  if (!userId) return ctx.reply('❌ Error: Unable to retrieve user ID.');

  try {
    const user = await getUserById(userId);

    if (user?.status === 'STARTER') {
      ctx.reply("🌐 *My Community*\nHere’s what you can do:", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🔝 Upgrade to BRONZE", callback_data: 'upgrade_to_bronze' }],
            [{ text: "💬 Go to Upline Group Chat", callback_data: 'upline_chat' }]
          ]
        }
      });
    } else if (user?.status === 'BRONZE') {
      const leaderboard = await getLeaderboard();
      ctx.reply(`🌟 *Leaderboard Highlights* 🌟\n\n🏆 *Biggest Community*: ${leaderboard.biggestCommunity}\n💰 *Highest Rewards Earned*: ${leaderboard.highestRewards}\n🚀 *Top Recruiter This Month*: ${leaderboard.topRecruiter}\n\n*Can you beat them? Stay active and grow your network to climb the ranks!*`, {
        parse_mode: "Markdown"
      });
    }
  } catch (error) {
    console.error('Error handling community:', error);
    ctx.reply('❌ Error: Unable to load your community data. Please try again later.');
  }
};
