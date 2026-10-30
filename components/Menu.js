'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { kategori, menu } from '@/lib/data';
import { rupiah } from '@/lib/format';
import { useNampan, pilihanAwal, tambahanPilihan } from '@/lib/nampan';
import { Plus, Minus, Cari, Tutup, Centang, Gelas, Cabai } from './Ikon';
import Mangkuk from './Mangkuk';
import FotoMenu from './FotoMenu';
import Skala from './Skala';
import LabelHarga from './LabelHarga';
import TabKategori from './TabKategori';

const SARING = [
  { id: 'favorit', label: 'Favorit', uji: (m) => m.tag?.includes('favorit') },
  { id: 'pedas', label: 'Pedas ≥3', uji: (m) => m.pedas >= 3, ikon: true },
  { id: 'tanpa-gluten', label: 'Tanpa gluten', uji: (m) => !m.gluten },
  { id: 'hemat', label: '≤ Rp10.000', uji: (m) => m.harga <= 10000 },
];

const PENJELASAN_PEDAS = ['tanpa sambal', 'sambal sedikit', 'masih ramah', 'pedas betul', 'dua sendok sambal', 'tiga sendok, siapkan es teh'];

function Tag({ t }) {
  const gaya = { favorit: 'bg-lampu text-malam', baru: 'bg-daun text-malam' };
  const teks = { favorit: 'Favorit', baru: 'Baru' };
  return <span className={`rounded-md px-1.5 py-0.5 text-[12px] font-bold uppercase tracking-wide ${gaya[t]}`}>{teks[t]}</span>;
}

function TombolTambah({ m, onPilih, className = '' }) {
  return (
    <button
      type="button"
      onClick={() => onPilih(m)}
      disabled={m.habis}
      aria-label={m.habis ? `${m.nama} habis malam ini` : `Tambah ${m.nama}${m.opsi?.length ? ', pilih opsi' : ''}`}
      className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-lampu text-malam transition hover:bg-[#ffc672] disabled:cursor-not-allowed disabled:bg-garis disabled:text-redup disabled:opacity-60 ${className}`}
    >
      <Plus className="h-5 w-5" strokeWidth={2.5} />
    </button>
  );
}

/** Ubin item 2 kolom: foto mangkuk (cadangan: ilustrasi), nama, deskripsi, skala pedas, label harga, tombol tambah. */
function Ubin({ m, onPilih }) {
  return (
    <li className="ubin relative flex flex-col p-3">
      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1">
        {m.tag?.map((t) => <Tag key={t} t={t} />)}
        {m.habis && <span className="rounded-md bg-malam px-1.5 py-0.5 text-[12px] font-bold uppercase tracking-wide text-lampu">Habis malam ini</span>}
      </div>
      <FotoMenu id={m.id} sizes="(min-width: 640px) 260px, 45vw" className={`-mx-1 -mt-1 aspect-square rounded-[10px] ${m.habis ? 'opacity-60 grayscale' : ''}`}>
        <Mangkuk p={m.mangkuk} className={`mx-auto mt-2 h-24 w-24 sm:h-28 sm:w-28 ${m.habis ? 'opacity-60' : ''}`} />
      </FotoMenu>
      <h3 className={`mt-3 text-[0.98rem] leading-tight ${m.habis ? 'text-pudar' : ''}`}>{m.nama}</h3>
      <p className={`potong-2 mt-1 text-[0.85rem] leading-snug ${m.habis ? 'text-pudar' : 'text-redup'}`}>{m.deskripsi}</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
        <div className="flex flex-col gap-1.5">
          {m.opsi?.some((o) => o.id === 'pedas') && <Skala n={m.pedas} className={m.habis ? 'opacity-60' : ''} />}
          <LabelHarga harga={m.harga} coret={m.habis} className="text-[1.05rem]" />
        </div>
        <TombolTambah m={m} onPilih={onPilih} />
      </div>
    </li>
  );
}

/** Ubin paket hemat: ukuran berbeda-beda (bento), foto mangkuk besar (cadangan: ilustrasi), harga normal dicoret. */
function UbinPaket({ m, onPilih, besar }) {
  return (
    <li className={`ubin relative overflow-hidden ${besar ? 'col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}>
      <div className={`flex h-full ${besar ? 'flex-row items-center gap-3 p-4 sm:gap-6 sm:p-6' : 'flex-col p-3 sm:p-4'}`}>
        <div className={`${besar ? 'order-2 shrink-0' : 'mx-auto'} ${m.habis ? 'opacity-60' : ''}`}>
          <FotoMenu id={m.id} sizes={besar ? '(min-width: 1024px) 256px, 192px' : '(min-width: 640px) 128px, 96px'} className={`rounded-full ring-4 ring-lampu/30 ${besar ? 'h-32 w-32 sm:h-48 sm:w-48 lg:h-64 lg:w-64' : 'h-24 w-24 sm:h-32 sm:w-32'}`}>
            <Mangkuk p={m.mangkuk} className={besar ? 'h-32 w-32 sm:h-48 sm:w-48 lg:h-64 lg:w-64' : 'h-24 w-24 sm:h-32 sm:w-32'} />
          </FotoMenu>
        </div>
        <div className={`flex min-w-0 flex-1 flex-col ${besar ? 'order-1' : 'mt-3'}`}>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="stensil">Paket</span>
            {m.tag?.map((t) => <Tag key={t} t={t} />)}
            {m.habis && <span className="rounded-md bg-malam px-1.5 py-0.5 text-[12px] font-bold uppercase tracking-wide text-lampu">Habis malam ini</span>}
          </div>
          <h3 className={`mt-1.5 leading-[0.95] ${besar ? 'text-[1.7rem] sm:text-[2.4rem] lg:text-[3rem]' : 'text-[1.05rem] sm:text-[1.3rem]'} ${m.habis ? 'text-pudar' : ''}`}>{m.nama}</h3>
          <p className={`mt-2 leading-snug ${m.habis ? 'text-pudar' : 'text-redup'} ${besar ? 'text-[0.95rem]' : 'potong-2 text-[0.85rem]'}`}>{m.deskripsi}</p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-4">
            <div className="flex flex-col gap-1.5">
              <Skala n={m.pedas} className={m.habis ? 'opacity-60' : ''} />
              <div className="flex flex-wrap items-baseline gap-2">
                <LabelHarga harga={m.harga} coret={m.habis} className={besar ? 'text-[1.5rem]' : 'text-[1.05rem]'} />
                {m.hargaNormal && <LabelHarga harga={m.hargaNormal} coret className="text-[0.85rem]" />}
              </div>
            </div>
            {besar ? (
              <button type="button" onClick={() => onPilih(m)} disabled={m.habis} aria-label={`Pilih ${m.nama}, pilih opsi`} className="tombol tombol-lampu min-h-11 px-4 disabled:cursor-not-allowed disabled:bg-garis disabled:text-redup">Pilih paket</button>
            ) : (
              <TombolTambah m={m} onPilih={onPilih} />
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/** Minuman: daftar ringkas satu kolom. */
function BarisMinuman({ m, onPilih }) {
  return (
    <li className="flex items-center gap-3 py-3">
      <FotoMenu id={m.id} sizes="56px" className={`h-14 w-14 shrink-0 rounded-[10px] ${m.habis ? 'opacity-60 grayscale' : ''}`}>
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] bg-tenda text-lampu ${m.habis ? 'opacity-60' : ''}`}><Gelas className="h-5 w-5" /></span>
      </FotoMenu>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <h3 className={`font-sans text-[1rem] font-bold normal-case tracking-normal ${m.habis ? 'text-pudar' : ''}`}>{m.nama}</h3>
          {m.tag?.map((t) => <Tag key={t} t={t} />)}
          {m.habis && <span className="text-xs font-bold text-lampu">Habis malam ini</span>}
        </div>
        <p className={`text-[0.85rem] leading-snug ${m.habis ? 'text-pudar' : 'text-redup'}`}>{m.deskripsi}</p>
      </div>
      <LabelHarga harga={m.harga} coret={m.habis} className="text-[0.98rem]" />
      <TombolTambah m={m} onPilih={onPilih} />
    </li>
  );
}

/** Lembar pilihan: level pedas (skala cabai), kuah, mie, tambahan multi-pilih, catatan, jumlah, lalu tambah ke nampan. */
function LembarPilihan({ item, onTutup, onTambah }) {
  const ref = useRef(null);
  const [pilihan, setPilihan] = useState({});
  const [qty, setQty] = useState(1);
  const [catatan, setCatatan] = useState('');

  useEffect(() => {
    if (!item) return;
    setPilihan(pilihanAwal(item));
    setQty(1);
    setCatatan('');
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, [item]);

  if (!item) return null;
  const harga = (item.harga + tambahanPilihan(item, pilihan)) * qty;
  const toggleMulti = (gid, pid) =>
    setPilihan((s) => {
      const arr = Array.isArray(s[gid]) ? s[gid] : [];
      return { ...s, [gid]: arr.includes(pid) ? arr.filter((x) => x !== pid) : [...arr, pid] };
    });

  return (
    <dialog ref={ref} className="lembar" onClose={onTutup} aria-labelledby="judul-pilihan">
      <form
        method="dialog"
        className="flex max-h-[92dvh] flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          onTambah(item, pilihan, qty, catatan.trim());
          ref.current?.close();
        }}
      >
        <div className="flex items-start gap-3 border-b border-garis px-5 pb-4 pt-5">
          <FotoMenu id={item.id} sizes="80px" className="h-20 w-20 shrink-0 rounded-[10px]">
            {item.mangkuk && <Mangkuk p={item.mangkuk} className="h-16 w-16 shrink-0" />}
          </FotoMenu>
          <div className="min-w-0 flex-1">
            <p className="stensil">{kategori.find((k) => k.id === item.kategori)?.nama}</p>
            <h2 id="judul-pilihan" className="mt-1 text-[1.5rem]">{item.nama}</h2>
            <p className="mt-1.5 text-sm text-redup">{item.deskripsi}</p>
          </div>
          <button type="button" onClick={() => ref.current?.close()} className="grid h-11 w-11 shrink-0 place-items-center rounded-[10px] border-2 border-garis" aria-label="Tutup">
            <Tutup className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {(item.opsi || []).map((o) => {
            if (o.gaya === 'cabai') {
              const lv = Number(pilihan[o.id] ?? 0);
              return (
                <fieldset key={o.id} className="mb-5">
                  <legend className="stensil mb-2">{o.label}</legend>
                  <div className="grid grid-cols-6 gap-1.5" role="radiogroup" aria-label={o.label}>
                    {o.pilihan.map((p) => {
                      const on = pilihan[o.id] === p.id;
                      return (
                        <button key={p.id} type="button" role="radio" aria-checked={on} aria-label={p.label} onClick={() => setPilihan((s) => ({ ...s, [o.id]: p.id }))} className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-[10px] border-[1.5px] ${on ? 'border-lampu bg-lampu text-malam' : 'border-garis bg-malam text-kuah'}`}>
                          <Cabai className={`h-5 w-5 ${p.cabai === 0 ? 'opacity-30' : on ? 'text-malam' : 'text-cabai'}`} />
                          <span className="text-xs font-bold">{p.cabai}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-2 text-sm text-redup" aria-live="polite">Level {lv}: {PENJELASAN_PEDAS[lv]}.</p>
                </fieldset>
              );
            }
            if (o.multi) {
              const arr = Array.isArray(pilihan[o.id]) ? pilihan[o.id] : [];
              return (
                <fieldset key={o.id} className="mb-5">
                  <legend className="stensil mb-2">{o.label} <span className="normal-case tracking-normal text-redup">(boleh lebih dari satu)</span></legend>
                  <div className="grid gap-2" role="group" aria-label={o.label}>
                    {o.pilihan.map((p) => {
                      const on = arr.includes(p.id);
                      return (
                        <button key={p.id} type="button" role="checkbox" aria-checked={on} onClick={() => toggleMulti(o.id, p.id)} className="pil-opsi">
                          <span className="flex items-center gap-2.5">
                            <span className={`grid h-5 w-5 place-items-center rounded-[5px] border-[1.5px] ${on ? 'border-lampu bg-lampu text-malam' : 'border-redup'}`} aria-hidden="true">{on && <Centang className="h-3.5 w-3.5" strokeWidth={3} />}</span>
                            {p.label}
                          </span>
                          {p.tambah ? <span className="text-sm text-putih">+{rupiah(p.tambah)}</span> : null}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>
              );
            }
            return (
              <fieldset key={o.id} className="mb-5">
                <legend className="stensil mb-2">{o.label}</legend>
                <div className="grid gap-2" role="radiogroup" aria-label={o.label}>
                  {o.pilihan.map((p) => {
                    const on = pilihan[o.id] === p.id;
                    return (
                      <button key={p.id} type="button" role="radio" aria-checked={on} onClick={() => setPilihan((s) => ({ ...s, [o.id]: p.id }))} className="pil-opsi">
                        <span className="flex items-center gap-2.5">
                          <span className={`grid h-5 w-5 place-items-center rounded-full border-[1.5px] ${on ? 'border-lampu bg-lampu text-malam' : 'border-redup'}`} aria-hidden="true">{on && <Centang className="h-3.5 w-3.5" strokeWidth={3} />}</span>
                          {p.label}
                        </span>
                        {p.tambah ? <span className="text-sm text-putih">+{rupiah(p.tambah)}</span> : null}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            );
          })}
          <label className="block">
            <span className="stensil mb-2 block">Catatan untuk dapur</span>
            <input value={catatan} onChange={(e) => setCatatan(e.target.value)} maxLength={80} placeholder="Mis. tanpa seledri, kuah banyak" className="isian" />
          </label>
        </div>

        <div className="flex items-center gap-3 border-t border-garis bg-malam px-5 py-4">
          <div className="inline-flex items-center rounded-[10px] border-2 border-garis" role="group" aria-label="Jumlah">
            <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center" aria-label="Kurangi"><Minus className="h-4 w-4" /></button>
            <span className="w-6 text-center font-bold" aria-live="polite">{qty}</span>
            <button type="button" onClick={() => setQty((q) => Math.min(20, q + 1))} className="grid h-11 w-11 place-items-center" aria-label="Tambah"><Plus className="h-4 w-4" /></button>
          </div>
          <button type="submit" className="tombol tombol-lampu min-h-11 flex-1 justify-between px-4">
            <span>Masukkan nampan</span>
            <span>{rupiah(harga)}</span>
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default function Menu() {
  const [cari, setCari] = useState('');
  const [saring, setSaring] = useState(null);
  const [dipilih, setDipilih] = useState(null);
  const [toast, setToast] = useState('');
  const { tambah } = useNampan();

  const q = cari.trim().toLowerCase();
  const lolos = useMemo(() => {
    const uji = saring ? SARING.find((s) => s.id === saring).uji : () => true;
    return menu.filter((m) => uji(m) && (!q || `${m.nama} ${m.deskripsi}`.toLowerCase().includes(q)));
  }, [q, saring]);
  const hitung = useMemo(() => Object.fromEntries(kategori.map((k) => [k.id, lolos.filter((m) => m.kategori === k.id).length])), [lolos]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const pilih = (m) => {
    if (m.opsi?.length) setDipilih(m);
    else {
      tambah(m.id, {}, 1, '');
      setToast(`${m.nama} masuk nampan`);
    }
  };
  const tambahDariLembar = (item, pilihan, qty, catatan) => {
    tambah(item.id, pilihan, qty, catatan);
    setToast(`${qty}× ${item.nama} masuk nampan`);
  };

  const adaSaring = q || saring;

  return (
    <section id="isi" aria-labelledby="judul-menu" className="scroll-mt-16">
      <h2 id="judul-menu" className="sr-only">Daftar menu</h2>

      {/* Cari & saring */}
      <div className="wadah pb-4 pt-6">
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Cari menu</span>
            <Cari className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-redup" />
            <input type="search" value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari: urat, mie ayam, es jeruk" className="isian min-h-11 pl-10" />
          </label>
          <div className="sembunyi-gulir -mx-4 flex gap-2 overflow-x-auto px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0" role="group" aria-label="Saring">
            {SARING.map((s) => (
              <button key={s.id} type="button" aria-pressed={saring === s.id} onClick={() => setSaring(saring === s.id ? null : s.id)} className="chip">
                {s.ikon && <Cabai className={`h-4 w-4 ${saring === s.id ? 'text-malam' : 'text-cabai'}`} />}
                {s.label}
              </button>
            ))}
          </div>
        </div>
        {adaSaring && (
          <p className="mt-3 text-sm text-redup" role="status">
            {lolos.length ? `${lolos.length} item cocok.` : 'Tidak ada yang cocok.'}{' '}
            <button type="button" onClick={() => { setCari(''); setSaring(null); }} className="font-bold text-lampu underline underline-offset-4">Tampilkan semua</button>
          </p>
        )}
      </div>

      <TabKategori hitung={hitung} />

      <div className="wadah">
        {kategori.map((k) => {
          const daftar = lolos.filter((m) => m.kategori === k.id);
          if (adaSaring && !daftar.length) return null;
          return (
            <section key={k.id} id={`k-${k.id}`} className="scroll-mt-[7.4rem] pt-10" aria-labelledby={`judul-${k.id}`}>
              <div className="flex items-end gap-4">
                <h2 id={`judul-${k.id}`} className="text-[1.9rem] sm:text-[2.4rem]">{k.nama}</h2>
                <span className="garis-spanduk mb-2.5 h-[6px] flex-1 rounded-sm opacity-90" aria-hidden="true" />
              </div>
              <p className="mt-2 max-w-2xl text-[0.92rem] text-redup">{k.catatan}</p>

              {k.id === 'paket' ? (
                <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:grid-rows-2">
                  {daftar.map((m, i) => <UbinPaket key={m.id} m={m} onPilih={pilih} besar={i === 0 && !adaSaring} />)}
                </ul>
              ) : k.id === 'minuman' ? (
                <ul className="mt-3 divide-y divide-garis lg:grid lg:grid-cols-2 lg:gap-x-10 lg:divide-y-0 lg:[&>li]:border-b lg:[&>li]:border-garis">
                  {daftar.map((m) => <BarisMinuman key={m.id} m={m} onPilih={pilih} />)}
                </ul>
              ) : (
                <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {daftar.map((m) => <Ubin key={m.id} m={m} onPilih={pilih} />)}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      <LembarPilihan item={dipilih} onTutup={() => setDipilih(null)} onTambah={tambahDariLembar} />

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex justify-center px-4">
        {toast && <p className="muncul rounded-[10px] bg-kuah px-4 py-2 text-sm font-bold text-malam shadow-lg">{toast}</p>}
      </div>
    </section>
  );
}
