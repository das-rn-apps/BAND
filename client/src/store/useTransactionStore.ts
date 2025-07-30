import { create } from 'zustand';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Transaction {
  _id?: string;
  name: string;
  amount: number;
  upiId?: string;
  mode: 'UPI' | 'Cash' | 'Card';
  purpose?: string;
  createdAt?: string;
}

interface State {
  allTransactions: Transaction[];  
  filteredTransactions: Transaction[];

  fetchAllTransactions: () => Promise<void>;
  filterByDateRange: (start: string, end: string) => void;
  resetFilter: () => void;
  addTransaction: (tx: Transaction) => Promise<void>;
}

export const useTransactionStore = create<State>((set, get) => ({
  allTransactions: [],
  filteredTransactions: [],

  fetchAllTransactions: async () => {
    const res = await axios.get(`${API_BASE_URL}/api/transactions`);
    const all = res.data;

    set({
      allTransactions: all,
      filteredTransactions: all,
    });
  },

  filterByDateRange: (start, end) => {
    const { allTransactions } = get();

    const filtered = allTransactions.filter(tx => {
      const date = new Date(tx.createdAt || '');
      return date >= new Date(start) && date <= new Date(end);
    });

    set({
      filteredTransactions: filtered,
    });
  },

  resetFilter: () => {
    const { allTransactions } = get();
    set({
      filteredTransactions: allTransactions,
    });
  },

  addTransaction: async (tx) => {
    await axios.post(`${API_BASE_URL}/api/transactions`, tx);
    await get().fetchAllTransactions();
  },
}));
