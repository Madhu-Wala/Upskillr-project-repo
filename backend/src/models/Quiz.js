import mongoose from "mongoose";

// const optionSchema = new mongoose.Schema(
//   {
//     optionText: {
//       type: String,
//       required: true
//     },
//     isCorrect: {
//       type: Boolean,
//       default: false
//     }
//   },
//   { _id: false }
// );

// const questionSchema = new mongoose.Schema(
//   {
//     questionText: {
//       type: String,
//       required: true
//     },

//     options: {
//       type: [optionSchema],
//       validate: [
//         {
//           validator: function (options) {
//             return options.length >= 2;
//           },
//           message: "Each question must have at least 2 options"
//         }
//       ]
//     },

//     explanation: {
//       type: String
//     }
//   },
//   { _id: true }
// );

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
