export type PaymentMode = "UPI" | "Cash" | "Card";

export interface TransanctionFormData {
  _id?: string;
  name: string;
  amount: number;
  transactionId: string;
  mode: PaymentMode;
  purpose?: string;
  type: string;
  isVerified: boolean;
  createdAt?: string;
}
