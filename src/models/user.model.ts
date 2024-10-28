import { Schema } from 'mongoose';

export const UserModel = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
