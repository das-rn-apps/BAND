
export type PaymentMode = 'UPI' | 'Cash' | 'Card';

export interface TransanctionFormData {
    name: string;
    amount: string;
    upiId: string;
    mode: PaymentMode;
    purpose: string;
}