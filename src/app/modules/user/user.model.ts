import mongoose, { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interfase";
import bcryptjs from "bcryptjs";
import config from "../../config";
import { user_role } from "./user.constant";

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    verified: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    phone: { type: String, required: true },
    address: { type: String },
    role: {
      type: String,
      enum: Object.keys(user_role),
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcryptjs.hash(
    user.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});
UserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

UserSchema.statics.isUserExistsByCustomId = async function (email: string) {
  console.log("object");
  return await User.findOne({ email }).select("+password");
};
UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  heshTextPassword
) {
  return await bcryptjs.compare(plainTextPassword, heshTextPassword);
};
// Create and export the User model
export const User = model<IUser, UserModel>("User", UserSchema);
