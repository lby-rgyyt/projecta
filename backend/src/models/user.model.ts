import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IAddress {
  label?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isDefault: boolean;
}

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  addresses: IAddress[];
  role: "user" | "vendor";
  stripeCustomerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const addressesSchema = new Schema<IAddress>({
  label: { type: String, required: false },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipCode: { type: String, required: true },
  isDefault: { type: Boolean, required: true },
});

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select:false },
    addresses: { type: [addressesSchema], default: [], required: true },
    role: {
      type: String,
      enum: ["user", "vendor"],
      default: "user",
      required: true,
    },
    stripeCustomerId: { type: String, required: false },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
