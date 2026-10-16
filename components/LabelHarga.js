import { angkaRupiah } from '@/lib/format';

/** Label harga seperti kertas harga kaki lima: putih, tepi sobek, "Rp" kecil. */
export default function LabelHarga({ harga, className = '', coret = false, awalan = '' }) {
  return (
    <span className={`label-harga ${coret ? 'coret' : ''} ${className}`}>
      {awalan && <span className="me-0.5 text-[0.7em] font-semibold">{awalan}</span>}
      <span className="rp">Rp</span>
      {angkaRupiah(harga)}
    </span>
  );
}
