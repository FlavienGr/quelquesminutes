const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      street: {
        type: String,
        trim: true,
        lowercase: true
      },
      city: {
        type: String,
        trim: true,
        lowercase: true
      },
      cp: {
        type: String,
        trim: true
      }
    },
    isAssociation: Boolean
  },
  { timestamps: true }
);

// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
