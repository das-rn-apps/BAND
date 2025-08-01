import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    mode: { type: String, enum: ["UPI", "Cash", "Card"], required: true },
    type: {
      type: String,
      enum: ["Debit", "Credit"],
      required: true,
      default: "Credit",
    },
    purpose: { type: String },
  },
  { timestamps: true }
);

export const Transaction = mongoose.model("Transaction", transactionSchema);
