const mongoose = require('mongoose');

const { Schema } = mongoose;

const JobSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    location: {
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
    start: Date,
    end: Date,
    contrat: String,
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
