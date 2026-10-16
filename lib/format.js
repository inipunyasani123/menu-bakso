// Format Rupiah dan jam buka dalam WIB (Asia/Jakarta). Tidak ada waktu lokal perangkat yang dipakai mentah.
const angka = new Intl.NumberFormat('id-ID');

export function rupiah(n) {
  return `Rp${angka.format(Math.round(n || 0))}`;
}

/** Angka saja, tanpa "Rp": untuk label harga yang menulis "Rp" kecil terpisah. */
export function angkaRupiah(n) {
  return angka.format(Math.round(n || 0));
}

// Menit sejak 00.00 WIB dan hari dalam minggu (0 = Minggu) untuk waktu tertentu.
export function sekarangWIB(ms = Date.now()) {
  const d = new Date(ms + 7 * 3600 * 1000);
  return { hari: d.getUTCDay(), menit: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

const keMenit = (jam) => {
  const [h, m] = jam.split('.').map(Number);
  return h * 60 + (m || 0);
};

export const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

/**
 * Status buka dari daftar jam `[{ hari: [1,2,3,4,5,6,0], buka: '16.00', tutup: '01.00' }]`.
 * Jam tutup lewat tengah malam ditangani: sesi kemarin masih dihitung sampai jam tutupnya (pukul 00.30 = masih buka),
 * dan sebelum jam buka hari ini (pukul 02.00) statusnya "tutup, buka 16.00" hari ini.
 */
export function statusBuka(jadwal, ms = Date.now()) {
  const { hari, menit } = sekarangWIB(ms);
  const sesi = (h) => jadwal.find((j) => j.hari.includes(h));
  const ini = sesi(hari);
  const kemarin = sesi((hari + 6) % 7);

  // Sisa sesi kemarin yang melewati tengah malam.
  if (kemarin && keMenit(kemarin.tutup) < keMenit(kemarin.buka) && menit < keMenit(kemarin.tutup)) {
    return { buka: true, sampai: kemarin.tutup };
  }
  if (ini) {
    const b = keMenit(ini.buka);
    const t = keMenit(ini.tutup);
    if (menit >= b && (t > b ? menit < t : true)) return { buka: true, sampai: ini.tutup };
    if (menit < b) return { buka: false, mulai: ini.buka, hariIni: true };
  }
  // Cari sesi berikutnya (mulai besok).
  for (let i = 1; i <= 7; i++) {
    const h = (hari + i) % 7;
    const s = sesi(h);
    if (s) return { buka: false, mulai: s.buka, hariIni: false, hariBerikut: i === 1 ? 'besok' : NAMA_HARI[h] };
  }
  return { buka: false };
}

// "Setiap hari" untuk 7 hari; "Sen–Jum" untuk [1,2,3,4,5]; "Sab & Min" untuk [6,0].
export function labelHari(hari) {
  if (hari.length === 7) return 'Setiap hari';
  const pendek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const urut = [...hari].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
  if (urut.length === 1) return pendek[urut[0]];
  const beruntun = urut.every((h, i) => i === 0 || (h + 6) % 7 === ((urut[i - 1] + 6) % 7) + 1);
  if (beruntun && urut.length > 2) return `${pendek[urut[0]]}–${pendek[urut[urut.length - 1]]}`;
  return urut.map((h) => pendek[h]).join(' & ');
}
