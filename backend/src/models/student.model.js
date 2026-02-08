import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    grade: {
      type: String,
      required: true,
    },
    attendance: {
      type: Number,
      default: 100,
    },
    assignmentCompletion: {
      type: Number,
      default: 0,
    },
    quizScores: {
      type: Number,
      default: 0,
    },
    studyHours: {
      type: Number,
      default: 0,
    },
    participation: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    xp: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        type: String,
      },
    ],
    subjects: [
      {
        name: { type: String, required: true },
        internalMarks: { type: Number, default: 0 },
        externalMarks: { type: Number, default: 0 },
        predictedScore: { type: Number, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
