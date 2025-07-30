import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import transactionRoutes from './routes/transaction.routes';
import { connectDB } from './config/db';

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
