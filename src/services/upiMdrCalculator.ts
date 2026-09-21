import type { MDRResult, TransactionType } from '../types/upi';
import { UPI_MDR_RULES } from '../config/upiRules';

export function calculateMDR(amountPaise: number, transactionType: TransactionType): MDRResult {
  const rule = UPI_MDR_RULES[transactionType];
  
  const result: MDRResult = {
    amountPaise,
    transactionType,
    ruleApplied: rule.description,
    rate: rule.rate,
    capPaise: rule.maxCapPaise || null,
    mdrPaise: 0,
    customerChargePaise: 0,
    explanation: 'No MDR applies to this transaction.'
  };

  if (transactionType === 'P2P' || transactionType === 'P2PM') {
    return result;
  }

  const isBelowThreshold = rule.thresholdPaise ? amountPaise <= rule.thresholdPaise : false;

  if (isBelowThreshold) {
    result.explanation = `Transaction amount is ₹${rule.thresholdPaise! / 100} or below; MDR is ₹0.`;
    return result;
  }

  // Calculate MDR based on rule
  if (rule.flatFeePaise) {
    result.mdrPaise = rule.flatFeePaise;
    result.explanation = `A flat fee of ₹${rule.flatFeePaise / 100} applies to this transaction.`;
  } else {
    // Percentage based
    let calculatedMdr = Math.round(amountPaise * rule.rate);
    
    if (rule.maxCapPaise && calculatedMdr > rule.maxCapPaise) {
      calculatedMdr = rule.maxCapPaise;
      result.explanation = `MDR capped at maximum limit of ₹${rule.maxCapPaise / 100}.`;
    } else {
      result.explanation = `Calculated MDR is ${rule.rate * 100}% of the transaction amount.`;
    }
    
    result.mdrPaise = calculatedMdr;
  }

  return result;
}
