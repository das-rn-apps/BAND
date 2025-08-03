import { create } from "zustand";
import axios from "axios";
import type { TransanctionFormData } from "../types";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface State {
  allTransactions: TransanctionFormData[];
  filteredTransactions: TransanctionFormData[];
  loading: boolean;
  error: string;

  fetchAllTransactions: () => Promise<void>;
  filterByDateRange: (start: string, end: string) => void;
  resetFilter: () => void;
  addTransaction: (tx: TransanctionFormData) => Promise<void>;
  verifyTransaction: (id: string, isVerified: boolean) => Promise<void>;
  setError: (msg: string) => void;
}

export const useTransactionStore = create<State>((set, get) => ({
  allTransactions: [],
  filteredTransactions: [],
  loading: false,
  error: "",

  // ✅ Set error from UI
  setError: (msg) => set({ error: msg }),

  // ✅ Fetch all transactions
  fetchAllTransactions: async () => {
    set({ loading: true, error: "" });
    try {
      const res = await axios.get(`${API_BASE_URL}/api/transactions`);
      const all = res.data;
      set({
        allTransactions: all,
        filteredTransactions: all,
      });
    } catch (error) {
      console.error("Failed to fetch transactions", error);
      set({ error: "Failed to fetch transactions." });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Filter by date range
  filterByDateRange: (start, end) => {
    const { allTransactions } = get();

    if (start && end) {
      const startTime = new Date(start).getTime();
      const endTime = new Date(end).getTime();

      const filtered = allTransactions.filter((tx) => {
        if (!tx.createdAt) return false;
        const created = new Date(tx.createdAt).getTime();
        return created >= startTime && created <= endTime;
      });

      set({ filteredTransactions: filtered });
    } else {
      set({ filteredTransactions: allTransactions });
    }
  },

  // ✅ Reset filter
  resetFilter: () => {
    const { allTransactions } = get();
    set({ filteredTransactions: allTransactions });
  },

  // ✅ Add transaction with validation
  addTransaction: async (tx) => {
    set({ loading: true, error: "" });

    try {
      // Validate transaction ID
      if (!tx.transactionId || tx.transactionId.length <= 20) {
        set({ error: "Transaction ID must be exactly 30 characters." });
        return;
      }

      // Optional: prevent duplicate transactionId
      const exists = get().allTransactions.some(
        (t) => t.transactionId === tx.transactionId
      );
      if (exists) {
        set({ error: "This transaction ID already exists." });
        return;
      }

      await axios.post(`${API_BASE_URL}/api/transactions`, tx);
      await get().fetchAllTransactions();
    } catch (error) {
      console.error("Failed to add transaction", error);
      set({ error: "Failed to add transaction." });
    } finally {
      set({ loading: false });
    }
  },

  // ✅ Verify a transaction
  verifyTransaction: async (id: string, isVerified: boolean) => {
    set({ loading: true, error: "" });
    try {
      await axios.patch(`${API_BASE_URL}/api/transactions/${id}/verify`, {
        isVerified,
      });

      const { allTransactions, filteredTransactions } = get();
      const updateList = (list: TransanctionFormData[]) =>
        list.map((tx) => (tx._id === id ? { ...tx, isVerified } : tx));

      set({
        allTransactions: updateList(allTransactions),
        filteredTransactions: updateList(filteredTransactions),
      });
    } catch (error) {
      console.error("Failed to update verification status", error);
      set({ error: "Failed to verify transaction." });
    } finally {
      set({ loading: false });
    }
  },
}));
