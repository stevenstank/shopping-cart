const USD_TO_INR = 83;

export function toINR(usdAmount) {
  return (usdAmount * USD_TO_INR).toFixed(2);
}
