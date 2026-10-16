'use client';

import { useEffect, useRef, useState } from 'react';
import { site, cariItem } from '@/lib/data';
import { rupiah } from '@/lib/format';
import { useNampan, useMeja, useCaraMakan, useTerpasang, hargaBaris, labelPilihan } from '@/lib/nampan';
import { Plus, Minus, Tutup, Mangkuk as IkonMangkuk, Salin, Sampah } from './Ikon';

function susunPesan({ baris, total, meja, cara, nama, catatan }) {
  const judul = `Halo ${site.nama}, saya mau pesan.`;
  const dari = `${meja ? `Meja ${meja}` : 'Meja belum diisi'} · ${cara === 'bungkus' ? 'bungkus' : 'makan di tenda'}${nama ? ` · atas nama ${nama}` : ''}`;
  const isi = baris.map((b) => {
    const item = cariItem(b.id);
    const pil = labelPilihan(b);
    return `${b.qty}× ${item?.nama ?? b.id}${pil ? ` (${pil})` : ''}${b.catatan ? `, catatan: ${b.catatan}` : ''} = ${rupiah(hargaBaris(b) * b.qty)}`;
  });
  return [judul, dari, '', ...isi, '', `Total ${rupiah(total)}`, catatan ? `Catatan: ${catatan}` : null, '', `Dikirim dari menu digital ${site.nama}`].filter((x) => x !== null).join('\n');
}

export default function Nampan() {
  const ref = useRef(null);
  const terpasang = useTerpasang();
  const { baris, jumlah, total, ubahQty, kosongkan } = useNampan();
  const [meja, setMeja] = useMeja();
  const [cara, setCara] = useCaraMakan();
  const [nama, setNama] = useState('');
  const [catatan, setCatatan] = useState('');
  const [disalin, setDisalin] = useState(false);

  useEffect(() => {
    const buka = () => ref.current && !ref.current.open && ref.current.showModal();
    window.addEventListener('dalu:nampan', buka);
    return () => window.removeEventListener('dalu:nampan', buka);
  }, []);

  const pesan = susunPesan({ baris, total, meja, cara, nama: nama.trim(), catatan: catatan.trim() });
  const salin = async () => {
    try {
      await navigator.clipboard.writeText(pesan);
      setDisalin(true);
      setTimeout(() => setDisalin(false), 2000);
    } catch {
      /* clipboard diblokir */
    }
  };
  const ada = terpasang && jumlah > 0;

  return (
    <>
      {/* Bilah nampan lengket di bawah */}
      <div className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-3 transition-transform duration-300 sm:px-6 ${ada ? 'translate-y-0' : 'translate-y-[120%]'}`} aria-hidden={!ada}>
        <button
          type="button"
          onClick={() => ref.current?.showModal()}
          tabIndex={ada ? 0 : -1}
          className="mx-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-[14px] bg-lampu p-2 text-malam shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
        >
          <span className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-[10px] bg-malam text-lampu"><IkonMangkuk className="h-5 w-5" /></span>
            <span className="text-left text-sm leading-tight">
              <span className="block font-bold">{jumlah} item di nampan</span>
              <span className="block font-medium opacity-80">{meja ? `Meja ${meja}` : 'Nomor meja belum diisi'}</span>
            </span>
          </span>
          <span className="flex items-center gap-3 pe-3 font-bold">{rupiah(total)}<span className="font-semibold opacity-80">Lihat</span></span>
        </button>
      </div>

      <dialog ref={ref} className="lembar" aria-labelledby="judul-nampan">
        <div className="flex max-h-[92dvh] flex-col">
          <div className="flex items-center justify-between border-b border-garis px-5 pb-4 pt-5">
            <div>
              <p className="stensil">Nampan</p>
              <h2 id="judul-nampan" className="mt-1 text-[1.5rem]">{jumlah ? `${jumlah} item · ${rupiah(total)}` : 'Nampan kosong'}</h2>
            </div>
            <button type="button" onClick={() => ref.current?.close()} className="grid h-11 w-11 place-items-center rounded-[10px] border-2 border-garis" aria-label="Tutup nampan"><Tutup className="h-5 w-5" /></button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-4">
            {baris.length ? (
              <ul className="divide-y divide-garis">
                {baris.map((b) => {
                  const item = cariItem(b.id);
                  const pil = labelPilihan(b);
                  return (
                    <li key={b.kunci + (b.catatan || '')} className="flex items-start gap-3 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[1rem] uppercase leading-tight">{item?.nama}</p>
                        {pil && <p className="mt-0.5 text-sm text-redup">{pil}</p>}
                        {b.catatan && <p className="mt-0.5 text-sm italic text-redup">“{b.catatan}”</p>}
                        <p className="mt-1 text-sm font-bold text-putih">{rupiah(hargaBaris(b) * b.qty)}</p>
                      </div>
                      <div className="inline-flex items-center rounded-[10px] border-2 border-garis" role="group" aria-label={`Jumlah ${item?.nama}`}>
                        <button type="button" onClick={() => ubahQty(b.kunci, b.catatan, b.qty - 1)} className="grid h-11 w-11 place-items-center" aria-label={b.qty === 1 ? `Hapus ${item?.nama}` : 'Kurangi'}>{b.qty === 1 ? <Sampah className="h-4 w-4" /> : <Minus className="h-4 w-4" />}</button>
                        <span className="w-5 text-center text-sm font-bold">{b.qty}</span>
                        <button type="button" onClick={() => ubahQty(b.kunci, b.catatan, b.qty + 1)} className="grid h-11 w-11 place-items-center" aria-label="Tambah"><Plus className="h-4 w-4" /></button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="py-6 text-center text-redup">Belum ada pesanan. Tekan tombol + di menu untuk mulai.</p>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="stensil mb-1.5 block">Nomor meja</span>
                <input value={meja} onChange={(e) => setMeja(e.target.value.replace(/[^0-9A-Za-z-]/g, '').toUpperCase())} inputMode="numeric" maxLength={6} placeholder="Tertulis di stiker meja" className="isian" />
              </label>
              <label className="block">
                <span className="stensil mb-1.5 block">Atas nama</span>
                <input value={nama} onChange={(e) => setNama(e.target.value)} maxLength={30} placeholder="Opsional" className="isian" />
              </label>
            </div>
            <div className="mt-3" role="radiogroup" aria-label="Cara makan">
              <span className="stensil mb-1.5 block">Cara makan</span>
              <div className="grid grid-cols-2 gap-2">
                {[['tenda', 'Makan di tenda'], ['bungkus', 'Bungkus']].map(([id, label]) => (
                  <button key={id} type="button" role="radio" aria-checked={cara === id} onClick={() => setCara(id)} className="chip min-h-11 justify-center">{label}</button>
                ))}
              </div>
            </div>
            <label className="mt-3 block">
              <span className="stensil mb-1.5 block">Catatan umum</span>
              <input value={catatan} onChange={(e) => setCatatan(e.target.value)} maxLength={100} placeholder="Mis. kuah dipisah semua" className="isian" />
            </label>
            <p className="mt-4 text-xs leading-relaxed text-redup">Di demo ini WhatsApp terbuka tanpa nomor tujuan. Saat dipasang untuk warung sungguhan, pesanan langsung masuk ke nomor WhatsApp kasir.</p>
          </div>

          <div className="border-t border-garis bg-malam px-5 py-4">
            <div className="flex gap-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(pesan)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!baris.length}
                onClick={(e) => !baris.length && e.preventDefault()}
                className={`tombol tombol-lampu min-h-12 flex-1 ${baris.length ? '' : 'pointer-events-none opacity-50'}`}
              >
                Pesan via WhatsApp
              </a>
              <button type="button" onClick={salin} disabled={!baris.length} className="tombol tombol-garis min-h-12 px-3.5 disabled:opacity-50" aria-label="Salin teks pesanan">
                <Salin className="h-5 w-5" />
                <span className="sr-only sm:not-sr-only">{disalin ? 'Tersalin' : 'Salin'}</span>
              </button>
            </div>
            {baris.length > 0 && (
              <button type="button" onClick={kosongkan} className="mt-3 min-h-11 w-full text-center text-sm font-semibold text-redup underline-offset-4 hover:underline">Kosongkan nampan</button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
