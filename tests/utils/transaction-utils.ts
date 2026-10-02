export interface TransactionTotals {
  spent: number;
  earned: number;
  net: number;
}

export function parseTransactionTotals(amountTexts: string[]): TransactionTotals {
  let spentCents = 0;
  let earnedCents = 0;

  for (const amountText of amountTexts) {
    const normalizedAmount = amountText.trim();
    const sign = normalizedAmount[0];
    const amount = Number(
      normalizedAmount.slice(1).replaceAll(',', '').replace('USD', '').trim(),
    );
    const amountInCents = Math.round(amount * 100);

    if ((sign !== '+' && sign !== '-') || !Number.isFinite(amount) || amountInCents < 0) {
      throw new Error(`Invalid transaction amount: "${amountText}"`);
    }

    if (sign === '-') {
      spentCents += amountInCents;
    } else {
      earnedCents += amountInCents;
    }
  }

  return {
    spent: spentCents / 100,
    earned: earnedCents / 100,
    net: (earnedCents - spentCents) / 100,
  };
}
