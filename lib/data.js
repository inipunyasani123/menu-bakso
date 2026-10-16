// Semua isi menu Bakso Dalu. Warung ini fiktif: nama, alamat, dan harganya rekaan untuk demo.

export const site = {
  nama: 'Bakso Dalu',
  slug: 'bakso',
  url: 'https://menu-bakso.pintuweb.id',
  judul: 'Menu Bakso Dalu: Bakso, Mie Ayam, Paket Hemat Malam',
  deskripsi:
    'Menu digital warung tenda Bakso Dalu, Solo: bakso urat, telur, jumbo, mie ayam, paket hemat. Buka 16.00–01.00 WIB. Pilih level pedas, pesan via WhatsApp.',
  tagline: 'Tenda biru di seberang Pasar Gede, sejak 2009.',
  alamat: 'Seberang Pasar Gede, Jl. Urip Sumoharjo, Jebres, Solo',
  kota: 'Solo',
  // Jam buka dalam WIB. 0 = Minggu. Tutup lewat tengah malam.
  jam: [{ hari: [1, 2, 3, 4, 5, 6, 0], buka: '16.00', tutup: '01.00' }],
  jamRingkas: 'buka 16.00–01.00',
  pajak: 'Harga bersih, tidak ada biaya tambahan. Bayar tunai atau QRIS di gerobak.',
  edisi: 'Oktober 2026',
};

export const KUNCI = {
  nampan: 'dalu.nampan.v1',
  meja: 'dalu.meja.v1',
  cara: 'dalu.cara.v1',
};

// Grup pilihan. `diam: true` = pilihan bawaan yang tidak perlu ditulis di ringkasan. `multi: true` = bisa pilih lebih dari satu.
const PEDAS = (bawaan) => ({
  id: 'pedas',
  label: 'Level pedas',
  gaya: 'cabai',
  bawaan: String(bawaan),
  pilihan: [
    { id: '0', label: 'Tidak pedas', cabai: 0 },
    { id: '1', label: 'Pedas 1', cabai: 1 },
    { id: '2', label: 'Pedas 2', cabai: 2 },
    { id: '3', label: 'Pedas 3', cabai: 3 },
    { id: '4', label: 'Pedas 4', cabai: 4 },
    { id: '5', label: 'Pedas 5', cabai: 5 },
  ],
});
const KUAH = { id: 'kuah', label: 'Kuah', pilihan: [{ id: 'bening', label: 'Kuah bening', diam: true }, { id: 'merah', label: 'Kuah merah (sambal diaduk)' }] };
const MIE = { id: 'mie', label: 'Mie', pilihan: [{ id: 'kuning', label: 'Mie kuning', diam: true }, { id: 'bihun', label: 'Bihun' }, { id: 'tanpa', label: 'Tanpa mie' }] };
const TOPPING = {
  id: 'topping',
  label: 'Tambahan',
  multi: true,
  pilihan: [
    { id: 'bakso', label: '+1 bakso', tambah: 5000 },
    { id: 'telur', label: '+ telur rebus', tambah: 4000 },
    { id: 'tahu', label: '+ tahu', tambah: 3000 },
    { id: 'pangsit', label: '+ pangsit goreng', tambah: 3000 },
  ],
};
const ES = { id: 'es', label: 'Es', pilihan: [{ id: 'normal', label: 'Es normal', diam: true }, { id: 'sedikit', label: 'Es sedikit' }, { id: 'tanpa', label: 'Tanpa es' }] };
const GULA = { id: 'gula', label: 'Gula', pilihan: [{ id: 'normal', label: 'Manis normal', diam: true }, { id: 'sedikit', label: 'Kurang manis' }, { id: 'tawar', label: 'Tawar' }] };

export const kategori = [
  { id: 'paket', nama: 'Paket Hemat', ringkas: 'Paket', catatan: 'Lebih murah daripada pesan satu-satu. Level pedas dan kuah tetap bisa dipilih.' },
  { id: 'bakso', nama: 'Bakso', ringkas: 'Bakso', catatan: 'Daging sapi digiling pagi, direbus sore. Kuah kaldu tulang 6 jam. Semua mangkuk bisa ganti bihun atau tanpa mie.' },
  { id: 'mie', nama: 'Mie & Kuah', ringkas: 'Mie', catatan: 'Mie ayam resep Solo: kecap, minyak ayam, sawi, ayam cincang.' },
  { id: 'gorengan', nama: 'Gorengan & Tambahan', ringkas: 'Gorengan', catatan: 'Digoreng saat dipesan. Nasi dan telur untuk yang lapar betul.' },
  { id: 'minuman', nama: 'Minuman', ringkas: 'Minuman', catatan: 'Teh tubruk Solo, jeruk peras asli, kopi tubruk. Semua bisa diatur es dan gulanya.' },
];

/**
 * Item menu.
 * pedas: level bawaan 0–5 (jadi nilai awal pilihan dan dasar saringan "Pedas ≥3").
 * gluten: mengandung mie/pangsit. tag: favorit | baru. habis: tidak bisa dipesan malam ini.
 * mangkuk: parameter ilustrasi (components/Mangkuk.js). hargaNormal: harga kalau dipesan satuan (paket).
 */
export const menu = [
  // Paket hemat
  { id: 'paket-dalu', kategori: 'paket', nama: 'Paket Dalu', deskripsi: 'Bakso campur (biasa, urat, telur) + es teh. Pilihan paling sering dipesan.', harga: 25000, hargaNormal: 27000, pedas: 2, gluten: true, tag: ['favorit'], opsi: [PEDAS(2), KUAH, MIE], mangkuk: { bakso: 2, urat: 1, telur: 1, mie: 'kuning', tahu: 0, pangsit: 0, kuah: 'bening' } },
  { id: 'paket-rame', kategori: 'paket', nama: 'Paket Rame', deskripsi: 'Dua mangkuk bakso biasa + dua es teh. Buat yang datang berdua.', harga: 36000, hargaNormal: 40000, pedas: 1, gluten: true, opsi: [PEDAS(1), KUAH, MIE], mangkuk: { bakso: 4, mie: 'kuning', kuah: 'bening', tahu: 0, pangsit: 1 } },
  { id: 'paket-tengah-malam', kategori: 'paket', nama: 'Paket Tengah Malam', deskripsi: 'Bakso urat + tahu + teh hangat. Kuah merah bawaan, pas untuk jam pulang kerja.', harga: 25000, hargaNormal: 27000, pedas: 3, gluten: true, tag: ['baru'], opsi: [PEDAS(3), { ...KUAH, bawaan: 'merah' }, MIE], mangkuk: { bakso: 1, urat: 2, mie: 'kuning', tahu: 1, kuah: 'merah' } },

  // Bakso
  { id: 'bakso-biasa', kategori: 'bakso', nama: 'Bakso Biasa', deskripsi: 'Lima bakso halus, mie kuning, tahu, taburan daun bawang dan bawang goreng.', harga: 15000, pedas: 1, gluten: true, opsi: [PEDAS(1), KUAH, MIE, TOPPING], mangkuk: { bakso: 5, mie: 'kuning', tahu: 1, kuah: 'bening' } },
  { id: 'bakso-urat', kategori: 'bakso', nama: 'Bakso Urat', deskripsi: 'Tiga bakso urat kasar yang kenyal, plus dua bakso halus.', harga: 20000, pedas: 2, gluten: true, tag: ['favorit'], opsi: [PEDAS(2), KUAH, MIE, TOPPING], mangkuk: { bakso: 2, urat: 3, mie: 'kuning', tahu: 1, kuah: 'bening' } },
  { id: 'bakso-telur', kategori: 'bakso', nama: 'Bakso Telur', deskripsi: 'Satu bakso besar berisi telur rebus utuh, ditemani tiga bakso halus.', harga: 18000, pedas: 1, gluten: true, opsi: [PEDAS(1), KUAH, MIE, TOPPING], mangkuk: { bakso: 3, telur: 1, mie: 'kuning', pangsit: 1, kuah: 'bening' } },
  { id: 'bakso-jumbo', kategori: 'bakso', nama: 'Bakso Jumbo', deskripsi: 'Satu bakso sebesar kepalan tangan, isi bakso-bakso kecil dan telur. Dibelah di meja.', harga: 25000, pedas: 1, gluten: true, habis: true, opsi: [PEDAS(1), KUAH, MIE, TOPPING], mangkuk: { jumbo: 1, bakso: 2, mie: 'kuning', kuah: 'bening' } },
  { id: 'bakso-campur', kategori: 'bakso', nama: 'Bakso Campur', deskripsi: 'Biasa, urat, telur, tahu, pangsit goreng. Semua yang ada di gerobak.', harga: 22000, pedas: 2, gluten: true, tag: ['favorit'], opsi: [PEDAS(2), KUAH, MIE, TOPPING], mangkuk: { bakso: 2, urat: 1, telur: 1, mie: 'kuning', tahu: 1, pangsit: 1, kuah: 'bening' } },
  { id: 'bakso-bakar', kategori: 'bakso', nama: 'Bakso Bakar', deskripsi: 'Lima bakso ditusuk, dibakar dengan olesan kecap dan sambal. Kuah bening disajikan terpisah.', harga: 20000, pedas: 3, gluten: false, tag: ['baru'], opsi: [PEDAS(3), TOPPING], mangkuk: { bakar: 5, kuah: 'bening', mie: 'tanpa' } },

  // Mie & kuah
  { id: 'mie-ayam', kategori: 'mie', nama: 'Mie Ayam', deskripsi: 'Mie kenyal, ayam cincang kecap, sawi hijau, kuah kaldu di mangkuk kecil.', harga: 15000, pedas: 1, gluten: true, opsi: [PEDAS(1), MIE], mangkuk: { mie: 'kuning', ayam: true, sawi: true, kuah: 'bening', tanpaKuah: true } },
  { id: 'mie-ayam-bakso', kategori: 'mie', nama: 'Mie Ayam Bakso', deskripsi: 'Mie ayam ditambah tiga bakso halus dan pangsit goreng.', harga: 20000, pedas: 1, gluten: true, tag: ['favorit'], opsi: [PEDAS(1), MIE, TOPPING], mangkuk: { mie: 'kuning', ayam: true, sawi: true, bakso: 3, pangsit: 1, kuah: 'bening', tanpaKuah: true } },
  { id: 'bihun-bakso', kategori: 'mie', nama: 'Bihun Bakso', deskripsi: 'Bihun lembut, empat bakso halus, kuah bening. Pilihan tanpa gluten.', harga: 17000, pedas: 1, gluten: false, opsi: [PEDAS(1), KUAH, TOPPING], mangkuk: { bihun: true, bakso: 4, tahu: 1, kuah: 'bening' } },
  { id: 'kuah-polos', kategori: 'mie', nama: 'Kuah Bening Polos', deskripsi: 'Semangkuk kaldu tulang hangat dengan daun bawang. Untuk menemani nasi atau gorengan.', harga: 8000, pedas: 0, gluten: false, opsi: [PEDAS(0)], mangkuk: { kuah: 'bening', mie: 'tanpa', daun: true } },

  // Gorengan & tambahan
  { id: 'tahu-goreng', kategori: 'gorengan', nama: 'Tahu Goreng', deskripsi: 'Tahu putih isi adonan bakso, digoreng garing. Per potong.', harga: 3000, pedas: 0, gluten: false, opsi: [], mangkuk: { piring: true, tahu: 2 } },
  { id: 'pangsit-goreng', kategori: 'gorengan', nama: 'Pangsit Goreng', deskripsi: 'Tiga keping pangsit renyah. Cocok dicelup kuah.', harga: 5000, pedas: 0, gluten: true, opsi: [], mangkuk: { piring: true, pangsit: 3 } },
  { id: 'kerupuk', kategori: 'gorengan', nama: 'Kerupuk', deskripsi: 'Kerupuk putih sebungkus kecil. Ambil dari kaleng, bayar yang dimakan.', harga: 2000, pedas: 0, gluten: false, opsi: [], mangkuk: { piring: true, kerupuk: 3 } },
  { id: 'nasi-putih', kategori: 'gorengan', nama: 'Nasi Putih', deskripsi: 'Satu porsi nasi hangat untuk teman kuah.', harga: 5000, pedas: 0, gluten: false, opsi: [], mangkuk: { piring: true, nasi: true } },
  { id: 'telur-rebus', kategori: 'gorengan', nama: 'Telur Rebus', deskripsi: 'Telur ayam rebus utuh, dikupas di meja.', harga: 4000, pedas: 0, gluten: false, opsi: [], mangkuk: { piring: true, telurRebus: 1 } },

  // Minuman
  { id: 'es-teh', kategori: 'minuman', nama: 'Es Teh', deskripsi: 'Teh tubruk wangi, gula pasir, es batu.', harga: 5000, pedas: 0, gluten: false, tag: ['favorit'], opsi: [ES, GULA] },
  { id: 'teh-hangat', kategori: 'minuman', nama: 'Teh Hangat', deskripsi: 'Teh tubruk panas di gelas belimbing.', harga: 4000, pedas: 0, gluten: false, opsi: [GULA] },
  { id: 'es-jeruk', kategori: 'minuman', nama: 'Es Jeruk', deskripsi: 'Jeruk peras asli, tidak pakai sirup.', harga: 7000, pedas: 0, gluten: false, opsi: [ES, GULA] },
  { id: 'jeruk-hangat', kategori: 'minuman', nama: 'Jeruk Hangat', deskripsi: 'Jeruk peras dengan air panas dan sedikit gula.', harga: 7000, pedas: 0, gluten: false, opsi: [GULA] },
  { id: 'kopi-hitam', kategori: 'minuman', nama: 'Kopi Hitam', deskripsi: 'Kopi tubruk robusta, buat yang masih mau melek.', harga: 6000, pedas: 0, gluten: false, opsi: [GULA] },
  { id: 'air-mineral', kategori: 'minuman', nama: 'Air Mineral', deskripsi: 'Botol 600 ml, dingin.', harga: 5000, pedas: 0, gluten: false, opsi: [] },
];

export const faq = [
  { q: 'Bagaimana cara memesan dari tenda?', a: 'Pindai QR di stiker meja, pilih menu dan level pedasnya, lalu tekan "Pesan via WhatsApp". Pesanan tersusun otomatis bersama nomor meja. Di demo ini WhatsApp terbuka tanpa nomor tujuan.' },
  { q: 'Level pedasnya seperti apa?', a: 'Level 0 tanpa sambal. Level 1–2 sambal rawit sedikit, masih ramah. Level 3 pedas betul. Level 4–5 sambal dua sampai tiga sendok, siapkan es teh.' },
  { q: 'Masih buka lewat tengah malam?', a: 'Buka setiap hari pukul 16.00 sampai 01.00 WIB. Pesanan terakhir diterima pukul 00.45. Kalau bakso habis lebih awal, itemnya kami tandai "habis malam ini" di menu ini.' },
  { q: 'Bisa bungkus untuk dibawa pulang?', a: 'Bisa. Pilih "Bungkus" di nampan. Kuah dipisah di plastik tersendiri supaya mie tidak lembek. Kami tidak melayani kirim ke rumah.' },
];

export const alergen = [
  'Mie kuning dan pangsit mengandung gluten (tepung terigu). Pilih bihun atau tanpa mie kalau perlu.',
  'Semua bakso dari daging sapi. Bakso telur dan topping telur mengandung telur ayam.',
  'Kuah kaldu dari tulang sapi, tanpa penyedap buatan berlebihan.',
  'Halal, tanpa babi, tanpa alkohol.',
];

export const cariItem = (id) => menu.find((m) => m.id === id);
export const itemKategori = (id) => menu.filter((m) => m.kategori === id);
