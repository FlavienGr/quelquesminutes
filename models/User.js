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
      zip: {
        type: String,
        trim: true
      }
    },
    isAssociation: {
      type: Boolean,
      default: false
    },
    infoAssociation: {
      form: {
        type: String,
        trim: true
      },
      declaration: {
        date: {
          type: String,
          trim: true
        },
        lieu: {
          type: String,
          trim: true
        }
      },
      data: {
        email: {
          type: String,
          trim: true,
          lowercase: true
        },
        tel: {
          type: Number,
          trim: true
        }
      },
      site: {
        type: String,
        trim: true,
        lowercase: true
      },
      description: String,
      social: {
        facebook: {
          type: String,
          trim: true,
          lowercase: true
        },
        twitter: {
          type: String,
          trim: true,
          lowercase: true
        },
        instagram: {
          type: String,
          trim: true,
          lowercase: true
        }
      }
    }
  },
  { timestamps: true }
);
UserSchema.methods.comparePassword = async (oldPassword, currentPassword) => {
  try {
    const isMatch = await bcrypt.compare(oldPassword, currentPassword);
    if (!isMatch) {
      return false;
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return true;
};
UserSchema.statics.findByCredentials = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return false;
  }
  return user;
};
// eslint-disable-next-line func-names
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.model('Users', UserSchema);

module.exports = User;
