import { site, faq, alergen, menu } from '@/lib/data';
import { labelHari } from '@/lib/format';
import Tanda from '@/components/Tanda';
import Lampu from '@/components/Lampu';
import Mangkuk from '@/components/Mangkuk';
import Meja from '@/components/Meja';
import StatusBuka from '@/components/StatusBuka';
import Menu from '@/components/Menu';
import Nampan from '@/components/Nampan';
import QR from '@/components/QR';
import Footer from '@/components/Footer';
import { Pindai, Jam } from '@/components/Ikon';

export const metadata = { alternates: { canonical: '/' } };

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const CONTOH_MEJA = '7';

export default function Halaman() {
  const jumlahMenu = menu.length;
  const jam = site.jam[0];

  return (
    <>
      {/* Untaian lampu tenda di atas header */}
      <div className="h-12 overflow-hidden bg-malam sm:h-14" aria-hidden="true">
        <Lampu className="h-full w-full" />
      </div>

      <header className="sticky top-0 z-40 border-b border-garis bg-malam/95 backdrop-blur">
        <div className="wadah flex h-14 items-center gap-3">
          <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.nama}, ke atas`}>
            <Tanda className="h-8 w-8 text-lampu" />
            <span className="whitespace-nowrap font-display text-[1.1rem] uppercase leading-none sm:text-[1.25rem]">{site.nama}</span>
          </a>
          <div className="ms-auto flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:block"><StatusBuka /></span>
            <Meja />
          </div>
        </div>
      </header>

      <main id="top" className="pb-24">
        {/* Hero: papan nama raksasa berbingkai spanduk */}
        <section className="wadah pt-5 sm:pt-8" aria-labelledby="judul-utama">
          <div className="spanduk rounded-[26px] p-2 sm:p-3">
            <div className="sorot relative overflow-hidden rounded-[18px] bg-malam px-5 pb-7 pt-8 sm:px-10 sm:pb-10 sm:pt-12 lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
              <div className="relative lg:col-span-7">
                <p className="stensil">Warung tenda · {site.kota} · sejak 2009</p>
                <h1 id="judul-utama" className="mt-3 text-[4.4rem] leading-[0.88] sm:text-[6.5rem] lg:text-[8.5rem]">
                  Bakso<br />Dalu
                </h1>
                <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-redup sm:text-lg">
                  {site.tagline} {jumlahMenu} pilihan: bakso urat, telur, jumbo, mie ayam, gorengan, dan paket hemat. Pilih level pedasmu, kirim pesanan dari meja.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex min-h-9 items-center gap-2 rounded-[10px] border border-garis bg-tenda px-3 text-sm font-semibold text-kuah">
                    <Jam className="h-4 w-4 text-lampu" />
                    {labelHari(jam.hari)} {site.jamRingkas} <span className="font-medium text-redup">WIB</span>
                  </span>
                  <StatusBuka />
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="#isi" className="tombol tombol-lampu">Lihat menu</a>
                  <a href="#pindai" className="tombol tombol-garis">Pindai di meja</a>
                </div>
              </div>
              <div className="mt-8 flex justify-center lg:col-span-5 lg:mt-0">
                <Mangkuk p={{ bakso: 2, urat: 1, telur: 1, mie: 'kuning', tahu: 1, pangsit: 1, kuah: 'bening' }} className="h-48 w-48 drop-shadow-[0_24px_40px_rgba(255,181,71,0.18)] sm:h-64 sm:w-64 lg:h-80 lg:w-80" />
              </div>
            </div>
          </div>
        </section>

        <Menu />

        {/* Pindai & pesan */}
        <section id="pindai" aria-labelledby="judul-pindai" className="wadah mt-16 scroll-mt-20">
          <div className="garis-spanduk rounded-sm" aria-hidden="true" />
          <div className="ubin mt-4 grid gap-8 px-5 py-8 sm:px-10 sm:py-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="stensil">Cara memesan</p>
              <h2 id="judul-pindai" className="mt-3 text-3xl sm:text-4xl">Pindai, pilih pedasnya, kirim.</h2>
              <ol className="mt-6 grid gap-4 text-[0.95rem] sm:grid-cols-3">
                {[
                  ['Pindai stiker meja', 'Tautannya membawa nomor mejamu, jadi pelayan tahu ke mana mengantar mangkuknya.'],
                  ['Isi nampan', 'Pilih level pedas 0–5, kuah bening atau merah, mie atau bihun, dan tambahan.'],
                  ['Kirim lewat WhatsApp', 'Pesanan tersusun rapi sebagai pesan. Bayar tunai atau QRIS di gerobak.'],
                ].map(([j, d], i) => (
                  <li key={j} className="border-t border-garis pt-3">
                    <p className="font-display text-base uppercase leading-tight"><span className="text-lampu">{i + 1}.</span> {j}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-redup">{d}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex items-center justify-center lg:col-span-5">
              <div className="w-full max-w-[17rem] rounded-[14px] bg-putih p-5 text-malam">
                <div className="flex items-center justify-between gap-6">
                  <p className="font-display text-sm uppercase">Nomor meja {CONTOH_MEJA}</p>
                  <Pindai className="h-4 w-4 text-cabai" />
                </div>
                <QR url={`${site.url}/?meja=${CONTOH_MEJA}`} className="mt-3 w-full text-malam" label={`Kode QR contoh untuk meja ${CONTOH_MEJA}`} />
                <p className="mt-3 text-center font-display text-base uppercase">{site.nama}</p>
                <p className="text-center text-[0.7rem] text-[#5a5468]">menu-bakso.pintuweb.id/?meja={CONTOH_MEJA}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Info & FAQ */}
        <section id="info" aria-labelledby="judul-info" className="wadah mt-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="stensil">Perlu diketahui</p>
            <h2 id="judul-info" className="mt-3 text-3xl sm:text-4xl">Alergen & catatan dapur</h2>
            <ul className="mt-5 space-y-2.5 text-[0.95rem] text-redup">
              {alergen.map((a) => (
                <li key={a} className="flex gap-3"><span aria-hidden="true" className="mt-[0.5em] h-2 w-2 shrink-0 rounded-sm bg-cabai" />{a}</li>
              ))}
            </ul>
            <dl className="mt-6 divide-y divide-garis border-y border-garis text-sm">
              {site.jam.map((j) => (
                <div key={j.buka + j.hari.join()} className="flex justify-between py-2.5"><dt className="text-redup">{labelHari(j.hari)}</dt><dd className="font-bold">{j.buka}–{j.tutup} WIB</dd></div>
              ))}
              <div className="flex justify-between gap-6 py-2.5"><dt className="text-redup">Pesanan terakhir</dt><dd className="font-bold">00.45 WIB</dd></div>
              <div className="flex justify-between gap-6 py-2.5"><dt className="shrink-0 text-redup">Lokasi</dt><dd className="text-end font-bold">{site.alamat}</dd></div>
            </dl>
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl">Yang sering ditanya</h2>
            <div className="mt-5 divide-y divide-garis border-y border-garis">
              {faq.map((f, i) => (
                <details key={f.q} name="faq" open={i === 0} className="group">
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3.5 text-[1.05rem] font-bold leading-snug [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] border-2 border-garis text-lg leading-none text-lampu transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-4 text-[0.95rem] leading-relaxed text-redup">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      </main>

      <Footer />
      <Nampan />
    </>
  );
}
