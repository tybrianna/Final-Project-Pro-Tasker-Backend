import mongoose, { Schema, Document } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;

  status: "To Do" | "In Progress" | "Done" | "Blocked";

  type: "Feature" | "Bug" | "Improvement" | "Research";

  project: mongoose.Types.ObjectId;
  dueDate?: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      enum: ["To Do", "In Progress", "Done", "Blocked"],
      default: "To Do",
    },

    type: {
      type: String,
      enum: ["Feature", "Bug", "Improvement", "Research"],
      default: "Feature",
    },

    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    dueDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);