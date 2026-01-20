import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true
    },

    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
      required: true
    },
    title: {
      type: String,
      required: true
    },

    totalMarks: {
      type: Number,
      default: 10
    },

    questions: [
      {
        questionText: { type: String, required: true },
        imgUrl: { type: String },
        options: [
          {
            optionText: String,
            isCorrect: Boolean
          }
        ],
        explanation: String,
        score: { type: Number, default: 0 }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", quizSchema);