const BN = "০১২৩৪৫৬৭৮৯";
export const toBn = (v: string | number) => String(v).replace(/\d/g, (d) => BN[+d]);
export const toEn = (v: string) => v.replace(/[০-৯]/g, (d) => String(BN.indexOf(d)));
/** "১,৮৫০ টাকা" -> 1850 */
export const parseBn = (v: string) => parseFloat(toEn(v).replace(/,/g, "").replace(/[^\d.]/g, "")) || 0;
export const formatPrice = (n: number) => toBn(n.toLocaleString("en-US"));
export const formatPct = (n: number) => toBn(n.toFixed(1));
export const bnDate = (d = new Date()) =>
  new Intl.DateTimeFormat("bn-BD", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" }).format(d);
const UNITS: Record<string, string> = { kg: "কেজি", litre: "লিটার", liter: "লিটার", l: "লিটার", dozen: "ডজন", piece: "পিস", pcs: "পিস", pc: "পিস" };
export const unitLabel = (u: string) => `প্রতি ${UNITS[u?.toLowerCase()] ?? u}`;
export const unitShort = (u: string) => UNITS[u?.toLowerCase()] ?? u;
