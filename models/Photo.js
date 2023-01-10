import mongoose from 'mongoose';

const Photo = mongoose.model(
  'Photo',
  mongoose.Schema(
    {
      photoId: String,
      singlePhoto: String,
      categories: Array,
      userPhoto: String,
      userId: mongoose.ObjectId,
      userName: String,
    },
    { timestamps: true },
  ),
);

export default Photo;
