/** Tanda warung: mangkuk dengan tiga kepul uap, warna mengikuti currentColor. */
export default function Tanda({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <path d="M8 34h48c0 12-9 22-24 22S8 46 8 34Z" fill="currentColor" />
      <path d="M14 34h36" stroke="var(--color-malam)" strokeWidth="3" strokeLinecap="round" />
      <path d="M22 8c0 5 5 5 5 10s-5 5-5 10M32 6c0 5 5 5 5 10s-5 5-5 10M42 8c0 5 5 5 5 10s-5 5-5 10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
