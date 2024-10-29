import creditCardType from "credit-card-type";

export function maxCardLength(value: string): number {
  const clearValue = value.replace(/\D/g, "");
  const cardFormat = creditCardType(clearValue)?.[0];

  if (!cardFormat) return 19;

  const maxLength = Math.max(...cardFormat.lengths);
  const gapCount = cardFormat.gaps.length;

  return maxLength + gapCount;
}

export function getSecurityCodeLength(value: string): number {
  const clearValue = value.replace(/\D/g, "");
  const cardFormat = creditCardType(clearValue)?.[0];

  return cardFormat?.code?.size ?? 3;
}
