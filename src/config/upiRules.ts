import type { TransactionType } from '../types/upi';

export interface MDRRule {
  type: TransactionType;
  thresholdPaise?: number; // threshold up to which rate is 0
  rate: number; // percentage in decimal, e.g., 0.004 for 0.4%
  flatFeePaise?: number; // flat fee instead of percentage
  maxCapPaise?: number; // max MDR cap
  description: string;
}

export const UPI_MDR_RULES: Record<TransactionType, MDRRule> = {
  P2P: {
    type: 'P2P',
    rate: 0,
    description: 'P2P transactions have zero MDR under the current framework.',
  },
  P2M: {
    type: 'P2M',
    thresholdPaise: 200000, // ₹2,000
    rate: 0.004, // 0.4%
    maxCapPaise: 30000, // ₹300
    description: 'P2M above ₹2,000 incurs 0.4% MDR capped at ₹300.',
  },
  P2PM: {
    type: 'P2PM',
    rate: 0,
    description: 'Eligible small merchants (P2PM) <= ₹1 Lakh/month have zero MDR.',
  },
  ESSENTIAL: {
    type: 'ESSENTIAL',
    thresholdPaise: 200000, // ₹2,000
    rate: 0,
    flatFeePaise: 500, // ₹5 flat
    description: 'Specified essential sectors above ₹2,000 incur a flat ₹5 MDR.',
  },
  CAPITAL: {
    type: 'CAPITAL',
    rate: 0.0002, // 0.02%
    maxCapPaise: 30000, // ₹300
    description: 'Capital market transactions incur 0.02% MDR capped at ₹300.',
  }
};
