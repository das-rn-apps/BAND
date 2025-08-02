export const calculateSummary = (transactions: any[]) => {
  const monthly: Record<string, number> = {};
  const yearly: Record<string, number> = {};
  let total = 0;

  transactions.forEach((tx) => {
    // Skip if missing required fields or not verified
    if (
      !tx?.createdAt ||
      typeof tx.amount !== "number" ||
      tx.isVerified !== true
    ) {
      return;
    }

    const date = new Date(tx.createdAt);
    const monthKey = date.toLocaleString("en-IN", {
      month: "long",
      year: "numeric",
    });
    const yearKey = `${date.getFullYear()}`;

    const signedAmount = tx.type === "Credit" ? tx.amount : -tx.amount;

    monthly[monthKey] = (monthly[monthKey] || 0) + signedAmount;
    yearly[yearKey] = (yearly[yearKey] || 0) + signedAmount;
    total += signedAmount;
  });

  return { monthly, yearly, total };
};
