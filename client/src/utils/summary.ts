export const calculateSummary = (transactions: any[]) => {
  const monthly: Record<string, number> = {};
  const yearly: Record<string, number> = {};

  transactions.forEach(tx => {
    const date = new Date(tx.createdAt);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const yearKey = `${date.getFullYear()}`;

    monthly[monthKey] = (monthly[monthKey] || 0) + tx.amount;
    yearly[yearKey] = (yearly[yearKey] || 0) + tx.amount;
  });

  return { monthly, yearly };
};
