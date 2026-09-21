export function rupeesToPaise(rupees: number | string): number {
  const amount = typeof rupees === 'string' ? parseFloat(rupees) : rupees;
  if (isNaN(amount)) return 0;
  return Math.round(amount * 100);
}

export function paiseToRupees(paise: number): number {
  return paise / 100;
}

export function formatCurrency(paise: number): string {
  const rupees = paiseToRupees(paise);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(rupees);
}

export function isValidAmount(amount: string | number): boolean {
  const val = typeof amount === 'string' ? parseFloat(amount) : amount;
  return !isNaN(val) && val > 0;
}

export function splitAmount(totalPaise: number, count: number): number[] {
  if (count <= 1) return [totalPaise];
  
  const baseSplit = Math.floor(totalPaise / count);
  let remainder = totalPaise % count;
  
  const splits = new Array(count).fill(baseSplit);
  
  // Distribute remainder 1 paisa at a time to earlier splits
  for (let i = 0; i < remainder; i++) {
    splits[i] += 1;
  }
  
  return splits;
}
