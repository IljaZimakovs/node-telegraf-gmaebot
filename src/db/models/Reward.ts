import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection';

class Reward extends Model {
  public id!: number;
  public userId!: string;
  public points!: number;
  public type!: string;
}

Reward.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: 'rewards',
  }
);

export default Reward;
