export type PaymentMode = "UPI" | "Cash" | "Card";

export interface TransanctionFormData {
  name: string;
  amount: number;
  transactionId: string;
  mode: PaymentMode;
  purpose: string;
  type: string;
}
