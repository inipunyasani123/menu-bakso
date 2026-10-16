const dasar = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Svg = ({ children, className = '', ...p }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...dasar} {...p}>{children}</svg>
);

export const Plus = (p) => <Svg {...p}><path d="M12 5v14M5 12h14" /></Svg>;
export const Minus = (p) => <Svg {...p}><path d="M5 12h14" /></Svg>;
export const Tutup = (p) => <Svg {...p}><path d="M6 6l12 12M18 6L6 18" /></Svg>;
export const Cari = (p) => <Svg {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></Svg>;
export const Centang = (p) => <Svg {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></Svg>;
export const Panah = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>;
export const Sampah = (p) => <Svg {...p}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></Svg>;
export const Salin = (p) => <Svg {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a1 1 0 0 1 1-1h10" /></Svg>;
export const Pindai = (p) => <Svg {...p}><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16" /></Svg>;
export const Meja = (p) => <Svg {...p}><path d="M3 8h18M6 8v10M18 8v10M6 13h12" /></Svg>;
export const Jam = (p) => <Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></Svg>;
export const Gelas = (p) => <Svg {...p}><path d="M6 3h12l-1.2 17a1 1 0 0 1-1 .9H8.2a1 1 0 0 1-1-.9L6 3ZM6.6 10h10.8" /></Svg>;
/** Mangkuk dengan uap: ikon nampan/pesanan. */
export const Mangkuk = (p) => <Svg {...p}><path d="M3 12h18a9 9 0 0 1-6 8.5H9A9 9 0 0 1 3 12ZM8 3.5c0 1.5 1.5 1.5 1.5 3S8 8 8 9M12 3.5c0 1.5 1.5 1.5 1.5 3S12 8 12 9M16 3.5c0 1.5 1.5 1.5 1.5 3S16 8 16 9" /></Svg>;
/** Cabai terisi: dipakai skala pedas. */
export const Cabai = ({ className = '', ...p }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...p}>
    <path d="M17.6 6.2c-1.6-.3-3 .5-3.6 2C12.6 11.6 9.3 15.6 4.4 18c-1 .5-.9 1.8.2 2 7.5 1.4 13.6-3.6 14.6-10.3.1-.9.1-1.8-.1-2.6-.4-.5-1-.8-1.5-.9Z" fill="currentColor" />
    <path d="M17.4 6.3c.2-1.6 1.2-2.7 2.7-3.1" fill="none" stroke="#6f9b2f" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
