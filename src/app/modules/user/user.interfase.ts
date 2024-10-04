import mongoose, { Document, Model } from "mongoose";
import { user_role } from "./user.constant";
export type Tuser_role = keyof typeof user_role;
export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  verified?: boolean;
  phone: string;
  address?: string;
  role?: Tuser_role;
}
export interface TUserDocument extends IUser, Document {
  role: any;
}

export interface UserModel extends Model<TUserDocument> {
  isUserExistsByCustomId(email: string): Promise<TUserDocument>;
  isPasswordMatched(
    plainTextPassword: string,
    hashTextPassword: string
  ): Promise<boolean>;
}
