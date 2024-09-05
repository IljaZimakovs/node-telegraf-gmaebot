import { Context } from 'telegraf';
import MLMData from '../db/models/MLMData';
import User from '../db/models/User';
import { apiClient } from './apiClient';

// Function to fetch leaderboard data
export const getLeaderboard = async () => {
  try {
    // Call an external API to get leaderboard data
    const response = await apiClient.get('/leaderboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    throw new Error('Could not fetch leaderboard data.');
  }
};

// Function to show team performance
export const showTeamPerformance = async (ctx: Context) => {
  const userId = ctx.from?.id;
  
  if (!userId) return ctx.reply('❌ Error: Unable to retrieve user ID.');

  try {
    // Retrieve user's MLM data
    const mlmData = await MLMData.findOne({ where: { userId } });

    if (!mlmData) {
      return ctx.reply('❌ No MLM data found for this user.');
    }

    ctx.reply(`📊 *Team Performance*\n\n- Total Members: ${mlmData.totalMembers}\n- Active: ${mlmData.totalMembers} (assumed)\n- Inactive: 0 (assumed)\n- Sales This Month: ${Math.floor(Math.random() * 2000)} points\n- New Recruits: ${Math.floor(Math.random() * 5)} this month`, { parse_mode: "Markdown" });
  } catch (error) {
    console.error('Error showing team performance:', error);
    ctx.reply('❌ An error occurred while fetching team performance. Please try again later.');
  }
};

// Function to show network stats
export const showNetworkStats = async (ctx: Context) => {
  const userId = ctx.from?.id;

  if (!userId) return ctx.reply('❌ Error: Unable to retrieve user ID.');

  try {
    // Retrieve network stats
    const mlmData = await MLMData.findOne({ where: { userId } });

    if (!mlmData) {
      return ctx.reply('❌ No MLM data found for this user.');
    }

    ctx.reply(`📈 *Network Stats*\n\n- Total Members: ${mlmData.totalMembers}\n- Tier Breakdown: 6 BRONZE, 4 SILVER (example data)\n- Points to Next Rank: ${mlmData.pointsToNextRank} points\n- Active Members by Rank: ${mlmData.totalMembers} (example data)`, { parse_mode: "Markdown" });
  } catch (error) {
    console.error('Error showing network stats:', error);
    ctx.reply('❌ An error occurred while fetching network stats. Please try again later.');
  }
};

// Function to handle MLM-related callback queries
export const handleMLMCallbackQuery = async (ctx: Context, action: string) => {
  switch (action) {
    case 'team_performance':
      await showTeamPerformance(ctx);
      break;
    case 'network_stats':
      await showNetworkStats(ctx);
      break;
    default:
      ctx.reply('❌ Unknown MLM action.');
  }
};
