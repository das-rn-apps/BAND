import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface Transaction {
  _id?: string;
  name: string;
  amount: number;
  transactionId: string;
  mode: "UPI" | "Cash" | "Card";
  purpose?: string;
  createdAt?: string;
  type: string;
}

interface State {
  allTransactions: Transaction[];
  filteredTransactions: Transaction[];
  loading: boolean;

  fetchAllTransactions: () => Promise<void>;
  filterByDateRange: (start: string, end: string) => void;
  resetFilter: () => void;
  addTransaction: (tx: Transaction) => Promise<void>;
}

export const useTransactionStore = create<State>((set, get) => ({
  allTransactions: [],
  filteredTransactions: [],
  loading: false,

  fetchAllTransactions: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE_URL}/api/transactions`);
      const all = res.data;
      set({
        allTransactions: all,
        filteredTransactions: all,
      });
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      set({ loading: false });
    }
  },

  filterByDateRange: (start, end) => {
    const { allTransactions } = get();

    if (start && end) {
      const startDateStr = new Date(start).toISOString().slice(0, 10);
      const endDateStr = new Date(end).toISOString().slice(0, 10);

      const filtered = allTransactions.filter((tx) => {
        if (!tx.createdAt) return false;

        const createdDateStr = new Date(tx.createdAt)
          .toISOString()
          .slice(0, 10);

        return createdDateStr >= startDateStr && createdDateStr <= endDateStr;
      });

      set({ filteredTransactions: filtered });
    } else {
      set({ filteredTransactions: allTransactions });
    }
  },

  resetFilter: () => {
    const { allTransactions } = get();
    set({ filteredTransactions: allTransactions });
  },

  addTransaction: async (tx) => {
    set({ loading: true });
    try {
      console.log(tx);
      await axios.post(`${API_BASE_URL}/api/transactions`, tx);
      await get().fetchAllTransactions();
    } catch (error) {
      console.error("Failed to add transaction", error);
    } finally {
      set({ loading: false });
    }
  },
}));
