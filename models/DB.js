const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    gameWins: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "db",
  }
);

module.exports = User;
