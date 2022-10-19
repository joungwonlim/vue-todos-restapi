import mongoose from 'mongoose';

const usersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'Active', //[ Active, Inactive, Pending ]
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Users', usersSchema);
