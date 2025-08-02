import { create } from "zustand";
import axios from "axios";
import type { TransanctionFormData } from "../types";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface State {
  allTransactions: TransanctionFormData[];
  filteredTransactions: TransanctionFormData[];
  loading: boolean;

  fetchAllTransactions: () => Promise<void>;
  filterByDateRange: (start: string, end: string) => void;
  resetFilter: () => void;
  addTransaction: (tx: TransanctionFormData) => Promise<void>;
  verifyTransaction: (id: string, isVerified: boolean) => Promise<void>;
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

  verifyTransaction: async (id: string, isVerified: boolean) => {
    set({ loading: true });
    try {
      await axios.patch(`${API_BASE_URL}/api/transactions/${id}/verify`, {
        isVerified,
      });

      // Update local state
      const { allTransactions, filteredTransactions } = get();
      const updateList = (list: TransanctionFormData[]) =>
        list.map((tx) => (tx._id === id ? { ...tx, isVerified } : tx));

      set({
        allTransactions: updateList(allTransactions),
        filteredTransactions: updateList(filteredTransactions),
      });
    } catch (error) {
      console.error("Failed to update verification status", error);
    } finally {
      set({ loading: false });
    }
  },
}));
