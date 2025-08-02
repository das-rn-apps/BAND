import { Request, Response } from "express";
import { Transaction } from "../models/transaction.model";

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const { purpose, ...rest } = req.body;

    // Normalize purpose
    const type = (purpose || "").toLowerCase() === "debit" ? "Debit" : "Credit";
    const newTx = await Transaction.create({ ...rest, purpose, type });

    res.status(201).json(newTx);
  } catch (error) {
    console.error("Transaction creation error:", error);
    res.status(500).json({ error: "Failed to create transaction" });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Normalize purpose/type if provided
    if (updates.purpose) {
      updates.type =
        updates.purpose.toLowerCase() === "debit" ? "Debit" : "Credit";
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    console.error("Transaction update error:", error);
    res.status(500).json({ error: "Failed to update transaction" });
  }
};

export const updateIsVerified = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { isVerified } = req.body;

    if (typeof isVerified !== "boolean") {
      return res.status(400).json({ error: "`isVerified` must be a boolean" });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      { isVerified },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.json(updatedTransaction);
  } catch (error) {
    console.error("Failed to update isVerified:", error);
    res.status(500).json({ error: "Failed to update verification status" });
  }
};
