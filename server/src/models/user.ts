import mongoose from "mongoose";

import { IUser, UserRoles } from "../interfaces/IUser";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: 1 },
    password: { type: String, required: false },
    walletId: { type: mongoose.Schema.Types.ObjectId, required: true, index: 1 },
    fullName: { type: String, required: true },
    role: { type: String, enum: UserRoles, required: true },
  },
  { timestamps: true }
);

userSchema.virtual("wallet", {
  ref: "wallets",
  localField: "walletId",
  foreignField: "_id",
  justOne: true,
});

userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.index({ email: "text" });

const User = mongoose.model<IUser>("users", userSchema);

export default User;
