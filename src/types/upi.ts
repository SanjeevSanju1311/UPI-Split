export interface UPIData {
  pa: string; // Payee VPA / UPI ID
  pn: string; // Payee Name
  am?: string; // Amount
  cu?: string; // Currency
  tn?: string; // Transaction Note
  mc?: string; // Merchant Code
  tr?: string; // Transaction Reference
  url?: string;
  isMerchant: boolean;
}

export type TransactionType = 'P2P' | 'P2M' | 'P2PM' | 'ESSENTIAL' | 'CAPITAL';

export interface MDRResult {
  amountPaise: number;
  transactionType: TransactionType;
  ruleApplied: string;
  rate: number; // For display, e.g., 0.004
  capPaise: number | null;
  mdrPaise: number;
  customerChargePaise: number; // Always 0 as MDR is merchant side
  explanation: string;
}

export interface Transaction {
  id: string;
  timestamp: string;
  merchantName: string;
  upiId: string;
  amountPaise: number;
  transactionType: TransactionType;
  splitCount: number;
  splitAmountsPaise: number[];
  estimatedMdrPaise: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
}
