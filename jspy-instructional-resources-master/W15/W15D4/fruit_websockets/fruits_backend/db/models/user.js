'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull:false
    },
    tokenId: {
      type: DataTypes.STRING
    },
    firstName: {
      type: DataTypes.STRING,
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };

  User.prototype.isValid = () => true;

  User.prototype.setPassword = function(password) {
    this.hashedPassword = bcrypt.hashSync(password);
    return this;
  }

  User.prototype.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  }

  User.prototype.toSafeObject = function() {
    return {
      createdAt: this.createdAt,
      email: this.email,
      id: this.id,
      firstName: this.firstName,
      updatedAt: this.updatedAt
    }
  }
  return User;
};