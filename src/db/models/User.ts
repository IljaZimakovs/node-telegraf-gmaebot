import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection';

class User extends Model {
  public id!: number;
  public userId!: string;
  public username!: string;
  public balance!: number;
  public status!: string;
}

User.init(
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
    username: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 300,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'STARTER',
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
