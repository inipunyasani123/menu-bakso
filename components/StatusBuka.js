'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/data';
import { statusBuka } from '@/lib/format';
import { Jam } from './Ikon';

/**
 * Status buka dihitung di perangkat tamu dalam WIB, diperbarui tiap menit. Sebelum terpasang: jam buka statis.
 * Jam tutup 01.00 lewat tengah malam ditangani oleh statusBuka.
 */
export default function StatusBuka({ className = '' }) {
  const [st, setSt] = useState(null);
  useEffect(() => {
    const tick = () => setSt(statusBuka(site.jam));
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);

  let teks = site.jamRingkas;
  let warna = 'text-redup';
  let titik = 'bg-garis';
  if (st) {
    if (st.buka) {
      teks = `Buka sekarang · tutup ${st.sampai}`;
      warna = 'text-daun';
      titik = 'bg-daun';
    } else {
      const kapan = st.hariIni ? '' : st.hariBerikut ? `${st.hariBerikut} ` : '';
      teks = st.mulai ? `Tutup · buka ${kapan}${st.mulai}` : 'Tutup';
      warna = 'text-lampu';
      titik = 'bg-lampu';
    }
  }
  return (
    <span className={`inline-flex min-h-9 items-center gap-2 rounded-[10px] border border-garis bg-tenda px-3 text-sm font-semibold ${warna} ${className}`}>
      {st ? <span aria-hidden="true" className={`h-2 w-2 rounded-full ${titik}`} /> : <Jam className="h-4 w-4 shrink-0" />}
      <span>{teks} <span className="font-medium text-redup">WIB</span></span>
    </span>
  );
}
