import type { UPIData } from '../types/upi';

export function decodeUPI(uri: string): UPIData | null {
  try {
    if (!uri.toLowerCase().startsWith('upi://pay')) {
      return null;
    }

    const url = new URL(uri);
    const params = url.searchParams;

    const pa = params.get('pa');
    if (!pa) return null; // 'pa' (Payee VPA) is mandatory

    const data: UPIData = {
      pa: pa,
      pn: params.get('pn') || 'Unknown Merchant',
      am: params.get('am') || undefined,
      cu: params.get('cu') || 'INR',
      tn: params.get('tn') || undefined,
      mc: params.get('mc') || undefined,
      tr: params.get('tr') || undefined,
      url: params.get('url') || undefined,
      // Simple heuristic: Most P2M merchants have mc (merchant code) or end with specific VPA suffixes, 
      // but let's default to true if `mc` exists, otherwise we'll ask the user.
      isMerchant: !!params.get('mc'),
    };

    return data;
  } catch (error) {
    return null;
  }
}

export function buildUPIUri(data: UPIData): string {
  const url = new URL('upi://pay');
  if (data.pa) url.searchParams.set('pa', data.pa);
  if (data.pn) url.searchParams.set('pn', data.pn);
  if (data.am) url.searchParams.set('am', data.am);
  if (data.cu) url.searchParams.set('cu', data.cu);
  if (data.tn) url.searchParams.set('tn', data.tn);
  if (data.mc) url.searchParams.set('mc', data.mc);
  if (data.tr) url.searchParams.set('tr', data.tr);
  if (data.url) url.searchParams.set('url', data.url);
  
  return url.toString();
}
