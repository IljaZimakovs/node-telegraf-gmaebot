import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection';

class MLMData extends Model {
  public id!: number;
  public userId!: string;
  public totalMembers!: number;
  public tier!: string;
  public pointsToNextRank!: number;
}

MLMData.init(
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
    totalMembers: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    tier: {
      type: DataTypes.STRING,
    },
    pointsToNextRank: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'mlm_data',
  }
);

export default MLMData;
