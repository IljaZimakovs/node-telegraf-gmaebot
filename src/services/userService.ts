import { Context } from 'telegraf'; // Import the Context type from telegraf
import User from '../db/models/User';

// Function to get a user by their ID
export const getUserById = async (userId: number): Promise<User | null> => {
  try {
    return await User.findOne({ where: { userId } });
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw new Error('Error fetching user.');
  }
};

// Function to create a new user
export const createUser = async (userId: number, username: string): Promise<User> => {
  try {
    return await User.create({ userId, username, balance: 300, status: 'STARTER' });
  } catch (error) {
    console.error(`Error creating user with ID ${userId}:`, error);
    throw new Error('Error creating user.');
  }
};

// Function to update a user's status and balance
export const updateUser = async (userId: number, status: string, balance: number): Promise<void> => {
  try {
    await User.update({ status, balance }, { where: { userId } });
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw new Error('Error updating user.');
  }
};

// Function to handle the upgrade of a user to BRONZE
export const handleUpgradeToBronze = async (ctx: Context): Promise<void> => {
  const userId = ctx.from?.id;

  if (!userId) {
    ctx.reply('❌ Error: Unable to retrieve user ID.');
    return;
  }

  try {
    // Retrieve the user by ID
    const user = await getUserById(userId);

    // Handle the case where the user is not found
    if (!user) {
      ctx.reply('❌ User not found. Please register first.');
      return;
    }

    // Check if the user has enough balance to upgrade
    if (user.balance && user.balance >= 200) {
      const newBalance = user.balance - 200;
      await updateUser(userId, 'BRONZE', newBalance);

      ctx.reply(
        `✅ *Success! 200 points have been deducted. Your new balance is ${newBalance} points.*\nYou’re now a BRONZE member! Explore your new community tools below.`
      );
    } else {
      ctx.reply('❌ *Insufficient balance to upgrade to BRONZE. Please top up your account.*');
    }
  } catch (error) {
    console.error('Error during user upgrade:', error);
    ctx.reply('❌ An error occurred while processing your upgrade. Please try again later.');
  }
};

// Function to handle Upline Chat
export const handleUplineChat = async (ctx: Context): Promise<void> => {
  const userId = ctx.from?.id;

  if (!userId) {
    ctx.reply('❌ Error: Unable to retrieve user ID.');
    return;
  }

  try {
    const user = await getUserById(userId);

    if (!user) {
      ctx.reply('❌ User not found. Please register first.');
      return;
    }

    ctx.reply('🔗 *Connecting you to your Upline Group Chat...*', { parse_mode: 'Markdown' });
  } catch (error) {
    console.error('Error handling upline chat:', error);
    ctx.reply('❌ An error occurred while connecting to the Upline Group Chat. Please try again later.');
  }
};
