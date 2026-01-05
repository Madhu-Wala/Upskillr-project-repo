import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
      index: true
    },

    questionText: {
      type: String,
      required: true
    },

    options: [
      {
        optionText: String,
        isCorrect: Boolean
      }
    ],

    explanation: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
