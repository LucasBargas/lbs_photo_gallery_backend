import mongoose from 'mongoose';

const User = mongoose.model(
  'User',
  mongoose.Schema(
    {
      userPhoto: String,
      firstName: String,
      secondName: String,
      contact: String,
      bio: String,
      email: String,
      userName: String,
      password: String,
    },
    { timestamps: true },
  ),
);

export default User;
