import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      index: true
    },

    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true,
      index: true
    },

    totalMarks: {
      type: Number,
      default: 100
    }
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);
