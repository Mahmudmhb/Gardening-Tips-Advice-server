import mongoose, { Document, Model } from "mongoose";
import { user_role } from "./user.constant";
export type Tuser_role = keyof typeof user_role;
export type TFavoritePost = {
  post: mongoose.Types.ObjectId;
};
export interface IUser {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  followers?: mongoose.Types.ObjectId[];
  following?: mongoose.Types.ObjectId[];
  verified?: boolean;
  premium?: boolean;
  phone: string;
  address?: string;
  role?: Tuser_role;
  transactionId?: string;
  payment?: string;
  favorite?: TFavoritePost[];
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
