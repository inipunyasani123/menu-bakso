import Link from 'next/link';
import Mangkuk from '@/components/Mangkuk';

export const metadata = { title: 'Halaman tidak ditemukan', robots: { index: false, follow: true }, alternates: { canonical: null } };

export default function TidakDitemukan() {
  return (
    <main id="isi" className="wadah flex min-h-[80vh] flex-col items-center justify-center py-16 text-center">
      <Mangkuk p={{ kuah: 'bening', mie: 'tanpa', daun: true, bawang: false }} className="h-32 w-32" />
      <p className="stensil mt-8">404 · mangkuk kosong</p>
      <h1 className="mt-3 text-5xl sm:text-6xl">Halaman ini<br />tidak ada</h1>
      <p className="mt-4 max-w-md text-redup">Alamat yang kamu buka tidak ada di menu. Menu lengkap ada di halaman utama, lengkap dengan nomor mejamu.</p>
      <Link href="/" className="tombol tombol-lampu mt-8">Kembali ke menu</Link>
    </main>
  );
}
