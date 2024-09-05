import { Context } from 'telegraf';
import { Message } from 'typegram'; // Import the type definitions for messages
import { handleCommunity } from '../commands/community';
import { handleEngageMembers } from '../commands/engageMembers';
import { handleGuidesSupport } from '../commands/guidesSupport';
import { handleRewardsCenter } from '../commands/rewardsCenter';

export const messageHandler = (ctx: Context) => {
  // Ensure that ctx.message exists and is a text message
  if (ctx.message && 'text' in ctx.message) {
    const text = (ctx.message as Message.TextMessage).text; // Type assertion to ensure it's a text message

    switch (text) {
      case '💬 My Community':
        handleCommunity(ctx);
        break;
      case 'Engage with Members':
        handleEngageMembers(ctx);
        break;
      case 'Guides & Support':
        handleGuidesSupport(ctx);
        break;
      case 'Rewards Center':
        handleRewardsCenter(ctx);
        break;
      default:
        ctx.reply('Command not recognized. Please choose a valid option.');
    }
  } else {
    // If the message is not text or is undefined, reply with a default message
    ctx.reply('Please send a text command.');
  }
};
