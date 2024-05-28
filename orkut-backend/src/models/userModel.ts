import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  email: string;
  password: string;
  rememberPassword: boolean;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rememberPassword: { type: Boolean, default: false }
});

export default mongoose.model<IUser>('User', UserSchema);
