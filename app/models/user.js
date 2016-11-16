/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcryptjs'),
  _ = require('underscore'),
  authTypes = ['github', 'twitter', 'facebook', 'google'];


/**
 * User Schema
 */
var UserSchema = new Schema({
  name: String,
  email: String,
  username: String,
  provider: String,
  avatar: String,
  premium: Number, // null or 0 for non-donors, 1 for everyone else (for now)
  donations: [],
  hashed_password: String,
  facebook: {},
  twitter: {},
  github: {},
  google: {},
  friends: []
});

/**
 * Virtuals
 */
UserSchema.virtual('password').set(function (password) {
  this._password = password;
  this.hashed_password = this.encryptPassword(password);
}).get(function () {
  return this._password;
});

/**
 * Validations
 * @param {String} value
 */
var validatePresenceOf = function (value) {
  return value && value.length;
};

// the below 4 validations only apply if you are signing up traditionally
UserSchema.path('name').validate(function (name) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) return true;
  return name.length;
}, 'Name cannot be blank');

UserSchema.path('email').validate(function (email) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return email.length;
}, 'Email cannot be blank');

UserSchema.path('username').validate(function (username) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return username.length;
}, 'Username cannot be blank');

UserSchema.path('hashed_password').validate(function (hashed_password) {
  // if you are authenticating by any of the oauth strategies, don't validate
  if (authTypes.indexOf(this.provider) !== -1) {
    return true;
  }
  return hashed_password.length;
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
  if (!this.isNew) {
    return next();
  }
  if (!validatePresenceOf(this.password) &&
  authTypes.indexOf(this.provider) === -1) {
    next(new Error('Invalid password'));
  }
  else {
    next();
  }
});

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   * @param {String} plainText plain text password
   * @return {Boolean} true / false
   * @api public
   */
  authenticate: function (plainText) {
    if (!plainText || !this.hashed_password) {
      return false;
    }
    return bcrypt.compareSync(plainText, this.hashed_password);
  },

  /**
   * Encrypt password
   * @param {String} password plain password
   * @return {String} encrypted password
   * @api public
   */
  encryptPassword: function (password) {
    if (!password) {
      return '';
    }
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  getFriends: function (callback) {
    this.model('User').find({_id: {$in: this.friends }},
    function (err, friends) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, friends);
      }
    });
  }
};

mongoose.model('User', UserSchema);
