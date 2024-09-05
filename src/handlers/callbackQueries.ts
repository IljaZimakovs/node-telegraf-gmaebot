import { Context } from 'telegraf'; // Only import Context
import { handleUpgradeToBronze, handleUplineChat } from '../services/userService';
import { showTeamPerformance, showNetworkStats } from '../services/mlmService';

export const callbackQueryHandler = async (ctx: Context) => {
  // Check if the callback query is present
  const callbackQuery = ctx.callbackQuery;

  if (callbackQuery && 'data' in callbackQuery) {  // Check if 'data' exists in callbackQuery
    const data = callbackQuery.data;

    switch (data) {
      case 'upgrade_to_bronze':
        await handleUpgradeToBronze(ctx);
        break;
      case 'upline_chat':
        await handleUplineChat(ctx);
        break;
      case 'team_performance':
        await showTeamPerformance(ctx);
        break;
      case 'network_stats':
        await showNetworkStats(ctx);
        break;
      default:
        await ctx.answerCbQuery('Unknown action.');
    }
  } else {
    await ctx.answerCbQuery('Invalid action.');
  }
};
