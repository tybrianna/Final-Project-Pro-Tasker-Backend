import mongoose, {
  Document,
  Model,
  Schema,
} from "mongoose";

import bcrypt from "bcryptjs";

export interface IUser
  extends Document {
  name: string;
  email: string;
  password: string;

  matchPassword(
    enteredPassword: string
  ): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

userSchema.pre(
  "save",
  async function (next) {
    if (
      !this.isModified("password")
    )
      return next();

    this.password =
      await bcrypt.hash(
        this.password,
        10
      );

    next();
  }
);

userSchema.methods.matchPassword =
  async function (
    enteredPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

const User: Model<IUser> =
  mongoose.model<IUser>(
    "User",
    userSchema
  );

export default User;