import { Cabai } from './Ikon';

const LABEL = ['Tidak pedas', 'Pedas 1 dari 5', 'Pedas 2 dari 5', 'Pedas 3 dari 5', 'Pedas 4 dari 5', 'Pedas 5 dari 5'];

/** Skala pedas 0–5: lima cabai, yang terisi berwarna cabai, sisanya redup. */
export default function Skala({ n = 0, ukuran = 'h-3.5 w-3.5', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-[2px] ${className}`} title={LABEL[n]}>
      <span className="sr-only">{LABEL[n]}</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <Cabai key={i} className={`${ukuran} ${i <= n ? 'text-cabai' : 'text-garis'}`} />
      ))}
    </span>
  );
}
