const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');
const db = require('../db');

// const User = db.define('user', {
//   email: {
//     type: Sequelize.STRING,
//     unique: true,
//     allowNull: false,
//     validate: {
//       isEmail: true
//     }
//   },
//   password: {
//     type: Sequelize.STRING
//   },
//   imageUrl: {
//     type: Sequelize.STRING
//   },
//   salt: {
//     type: Sequelize.STRING
//   }
// });

const User = db.define(
  'user',
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING
    },
    imageUrl: {
      type: Sequelize.STRING
    },
    salt: {
      type: Sequelize.STRING
    }
  },
  {
    hooks: {
      beforeCreate: setSaltAndPassword,
      beforeUpdate: setSaltAndPassword
    }
  }
);
// User.beforeValidate(function(user, options) {
//   user.mood = 'happy'
//   return sequelize.Promise.resolve(user)
// })

// User.afterValidate(function(user, options, fn) {
//   user.username = 'Toni'
//   fn(null, user)
// })

// instance methods
User.prototype.correctPassword = function(candidatePassword) {
  return (
    this.Model.encryptPassword(candidatePassword, this.salt) === this.password
  );
};

User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

// class methods
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plainText, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plainText);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword(user) {
  // we need to salt and hash again when the user enters their password for the first time
  // and do it again whenever they change it
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
}

module.exports = {
  User
};
