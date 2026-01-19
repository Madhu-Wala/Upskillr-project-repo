import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },

    title: {
      type: String,
      required: true
    },

    video: {
      url: { type: String },
      publicId: { type: String }
    },

    contentMarkdown: {
      type: String
    },

    resources: [
      {
        name: String,
        url: String
      }
    ],

    order: {
      type: Number,
      required: true
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz"
    }
  },
  { timestamps: true }
);

lessonSchema.index({ courseId: 1, order: 1 });

export default mongoose.model("Lesson", lessonSchema);
