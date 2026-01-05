import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
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

    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson"
      }
    ],

    quizAttempts: [
      {
        quizId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Quiz"
        },
        score: Number,
        attemptedAt: Date
      }
    ],

    progressPercent: {
      type: Number,
      default: 0
    },

    lastAccessedLessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    },

    lastAccessedAt: {
      type: Date
    },

    completedAt: {
      type: Date
    }
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);
