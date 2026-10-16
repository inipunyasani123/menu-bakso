import { site } from '@/lib/data';
import { labelHari } from '@/lib/format';
import Tanda from './Tanda';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-garis bg-tenda">
      <div className="wadah grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Tanda className="h-10 w-10 text-lampu" />
            <p className="font-display text-2xl uppercase leading-none text-kuah">{site.nama}</p>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-redup">{site.tagline} Warung tenda kaki lima di {site.kota} yang buka saat kota mulai sepi. Menunya ditulis di halaman ini supaya spanduk tidak perlu dicetak ulang tiap ganti harga.</p>
        </div>
        <div className="text-sm">
          <p className="stensil">Jam buka</p>
          <ul className="mt-3 space-y-1.5">
            {site.jam.map((j) => (
              <li key={j.buka + j.hari.join()} className="flex justify-between gap-4 border-b border-garis pb-1.5">
                <span className="text-redup">{labelHari(j.hari)}</span>
                <span className="font-semibold text-kuah">{j.buka}–{j.tutup} WIB</span>
              </li>
            ))}
            <li className="pt-1 text-redup">Pesanan terakhir 00.45. Libur hanya saat Lebaran.</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="stensil">Lokasi</p>
          <p className="mt-3 leading-relaxed text-kuah">{site.alamat}</p>
          <p className="mt-3 text-redup">Menu edisi {site.edisi}. {site.pajak}</p>
        </div>
      </div>
      <div className="border-t border-garis">
        <p className="wadah py-4 text-xs text-redup">© 2026 {site.nama}. Usaha fiktif untuk demo menu digital.</p>
      </div>
    </footer>
  );
}
