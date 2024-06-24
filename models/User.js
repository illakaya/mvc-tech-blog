const { Model, DataTypes } = require('sequelize');
// required to hash the storing of the passwords
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // polymorphism - add function to check the password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true, // usernames must be unique
      allowNull: false, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      }, // pw needs to be longer than 6 char
    },
  },
  {
    hooks: { // add a hook to execute before storing the password
      async beforeCreate(newUserData) {
        console.log('Hashing password');
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
