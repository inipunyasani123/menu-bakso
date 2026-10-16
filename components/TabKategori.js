'use client';

import { useEffect, useRef, useState } from 'react';
import { kategori } from '@/lib/data';

/**
 * Baris tab kategori lengket di bawah header, dengan jumlah item per tab dan garis bawah amber pada tab aktif.
 * Scrollspy: bagian menu yang sedang terlihat menandai tabnya. `hitung` = jumlah item per kategori setelah saringan.
 */
export default function TabKategori({ hitung }) {
  const [aktif, setAktif] = useState(kategori[0].id);
  const wadah = useRef(null);

  useEffect(() => {
    const bagian = kategori.map((k) => document.getElementById(`k-${k.id}`)).filter(Boolean);
    if (!bagian.length) return;
    const terlihat = new Map();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) terlihat.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        const pertama = bagian.find((b) => (terlihat.get(b.id) || 0) > 0);
        if (pertama) setAktif(pertama.id.slice(2));
      },
      { rootMargin: '-130px 0px -55% 0px', threshold: [0, 0.1, 0.5] },
    );
    bagian.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, [hitung]);

  useEffect(() => {
    // Geser mendatar saja (scrollIntoView bisa ikut menggulir halaman secara vertikal saat halaman baru dibuka).
    const w = wadah.current;
    const el = w?.querySelector(`[data-id="${aktif}"]`);
    if (!w || !el) return;
    w.scrollTo({ left: el.offsetLeft - (w.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' });
  }, [aktif]);

  return (
    <nav aria-label="Kategori menu" className="sticky top-14 z-30 border-b border-garis bg-malam/95 backdrop-blur">
      <ul ref={wadah} className="sembunyi-gulir wadah flex gap-5 overflow-x-auto sm:gap-7">
        {kategori.map((k) => {
          const n = hitung[k.id] ?? 0;
          return (
            <li key={k.id} className="shrink-0">
              <a href={`#k-${k.id}`} data-id={k.id} aria-current={k.id === aktif ? 'true' : undefined} className={`tab ${n === 0 ? 'opacity-50' : ''}`}>
                {k.ringkas}
                <span className="hitung" aria-label={`${n} item`}>{n}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
