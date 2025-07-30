import { Request, Response } from 'express';
import { Transaction } from '../models/transaction.model';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const newTx = await Transaction.create(req.body);
    res.status(201).json(newTx);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({});
    res.json(transactions );
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
