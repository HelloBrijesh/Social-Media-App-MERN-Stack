import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    token: { type: String, required: true },
  },
  {
    timestamps: false,
  }
);

export default mongoose.model("RefreshToken", refreshTokenSchema, "refreshTokens");
