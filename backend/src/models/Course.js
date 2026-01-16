import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    thumbnail: {
      url: String,
      publicId: String
    },

    category: {
      type: String,
      index: true
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      index: true
    },

    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    lessonsCount: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
      index: true
    },

    publishedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Course", courseSchema);
