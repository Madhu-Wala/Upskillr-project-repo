import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },

    feedback: {
      type: String
    }
  },
  { timestamps: true }
);

ratingSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("Rating", ratingSchema);
