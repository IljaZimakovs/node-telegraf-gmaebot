import { Context } from 'telegraf';
import { getUserRewards } from '../services/walletService';

export const handleRewardsCenter = async (ctx: Context) => {
  const userId = ctx.from?.id;

  if (!userId) return ctx.reply('❌ Error: Unable to retrieve user ID.');

  try {
    const rewards = await getUserRewards(userId);
    ctx.reply(`💰 **Rewards Center**\nHere’s a breakdown of your recent activity points:\n\n📅 **This Week**: ${rewards.thisWeek} points added\n📅 **Last Month**: ${rewards.lastMonth} points total\n💸 **Current Balance**: ${rewards.balance} points available\n\n[🔗 Redeem in Rewards Center]`);
  } catch (error) {
    ctx.reply('❌ Unable to retrieve your rewards. Please try again later.');
  }
};
