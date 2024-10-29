import creditCardType from "credit-card-type";

export function formatStringWithCreditCardGaps(value: string): string {
  const clearValue = value.replace(/\D/g, "");
  const cardFormat = creditCardType(clearValue)?.[0];

  const gaps = cardFormat ? cardFormat.gaps : [4, 8, 12];
  let formattedValue = "";
  let lastIndex = 0;

  gaps.forEach((gap) => {
    if (clearValue.length <= gap) {
      formattedValue += clearValue.slice(lastIndex);
      lastIndex = clearValue.length;
    } else {
      formattedValue += clearValue.slice(lastIndex, gap) + " ";
      lastIndex = gap;
    }
  });

  formattedValue += clearValue.slice(lastIndex);
  return formattedValue.trim();
}

export function formatExpiryDate(value: string): string {
  const clearValue = value.replace(/\D/g, "");

  const month = clearValue.slice(0, 2);
  const year = clearValue.slice(2, 4);

  if (clearValue.length <= 2) {
    return month;
  }

  return `${month}/${year}`;
}
