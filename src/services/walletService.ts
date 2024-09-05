import Reward from '../db/models/Reward';

export const getUserRewards = async (userId: number) => {
  const rewards = await Reward.findAll({ where: { userId } });
  const totalPoints = rewards.reduce((acc, reward) => acc + reward.points, 0);
  return { balance: totalPoints, thisWeek: 150, lastMonth: 400 };
};
