

export interface HistoryRecord {
  id: string;
  timestamp: string;
  merchantName: string;
  upiId: string;
  totalAmountPaise: number;
  splitCount: number;
}

const HISTORY_KEY = 'upi_smart_splitter_history';

export function saveToHistory(record: Omit<HistoryRecord, 'id' | 'timestamp'>): void {
  try {
    const existingStr = localStorage.getItem(HISTORY_KEY);
    const existing: HistoryRecord[] = existingStr ? JSON.parse(existingStr) : [];
    
    const newRecord: HistoryRecord = {
      ...record,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString()
    };
    
    existing.unshift(newRecord);
    // Keep only last 50
    if (existing.length > 50) existing.pop();
    
    localStorage.setItem(HISTORY_KEY, JSON.stringify(existing));
  } catch (error) {
    console.error("Failed to save history", error);
  }
}

export function getHistory(): HistoryRecord[] {
  try {
    const existingStr = localStorage.getItem(HISTORY_KEY);
    return existingStr ? JSON.parse(existingStr) : [];
  } catch (error) {
    console.error("Failed to read history", error);
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
