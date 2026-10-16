# Bakso Dalu — Menu digital (QR menu)

Demo menu digital untuk warung tenda bakso: satu halaman ringan yang dibuka dari stiker QR di meja. Tamu memindai, memilih level pedas dan tambahannya, lalu mengirim pesanan lewat WhatsApp bersama nomor meja. Bakso Dalu adalah warung fiktif.

**Demo live:** https://menu-bakso.pintuweb.id — coba dengan nomor meja: https://menu-bakso.pintuweb.id/?meja=7

> Nama warung, alamat, dan harga semuanya rekaan. Tidak ada data yang dikirim ke server: nampan dan nomor meja disimpan di `localStorage` browser pengunjung, dan tombol WhatsApp membuka WhatsApp tanpa nomor tujuan.

## Yang diperlihatkan

- **Nomor meja dari QR.** Tautan `?meja=7` dibaca sekali lalu disimpan; lencana meja di header dan pesan WhatsApp ikut menyebutnya. Nomor bisa diketik sendiri di nampan.
- **Tab kategori lengket dengan jumlah item.** Baris tab di bawah header menandai bagian yang sedang dibaca (scrollspy); angkanya ikut saringan yang aktif.
- **Cari dan saring.** Pencarian nama/deskripsi, saringan Favorit, Pedas ≥3, Tanpa gluten, ≤ Rp10.000; bagian yang kosong disembunyikan.
- **Level pedas 0–5.** Skala cabai di tiap ubin dan di lembar pilihan; level bawaan per item.
- **Opsi multi-pilih.** Tambahan (+bakso, +telur, +tahu, +pangsit) bisa dipilih beberapa sekaligus; harganya dijumlah dan kombinasi beda jadi baris beda di nampan.
- **Nampan ke WhatsApp.** Jumlah per baris, makan di tenda/bungkus, atas nama, catatan, lalu pesan tersusun otomatis (`wa.me/?text=`) atau disalin.
- **Jam buka lewat tengah malam.** Buka 16.00–01.00 WIB; status buka/tutup dihitung di perangkat tamu dalam WIB, termasuk sisa sesi setelah pukul 00.00.
- **Kode QR sungguhan.** Dibuat saat build dengan paket `qrcode` sebagai SVG inline; inilah yang dicetak untuk tiap meja.
- **SEO menu.** JSON-LD `Restaurant` + `Menu` → `MenuSection` → `MenuItem` dengan harga, plus `FAQPage`.

## Identitas visual

- **Huruf:** Alfa Slab One (judul, huruf kapital seperti cat spanduk) dan Barlow (teks), lewat `next/font`.
- **Warna:** latar malam `#141220`, kartu tenda `#1e1b2e`, teks kuah krem `#f3e4c6`, lampu amber `#ffb547`, cabai `#ef4f3a`, daun bawang `#a3d75a`, putih untuk harga.
- **Motif:** spanduk bergaris diagonal merah-putih sebagai bingkai hero dan pemisah bagian, untaian lampu bohlam tenda di atas header, skala pedas lima cabai, label harga seperti kertas kaki lima bertepi sobek dengan "Rp" kecil.
- **Ilustrasi:** `components/Mangkuk.js`, SVG mangkuk tampak atas yang parametrik per item (jumlah bakso, urat bertekstur, bakso telur, jumbo, tusuk bakar, mie kuning/bihun, tahu, pangsit, ayam dan sawi, kuah bening/merah, taburan, serta mode piring untuk gorengan).

## Struktur

| Berkas | Isi |
| --- | --- |
| `lib/data.js` | Profil warung, jam buka, 5 kategori, 24 item, grup pilihan, FAQ, alergen |
| `lib/format.js` | Rupiah, status buka WIB (jam tutup lewat tengah malam) |
| `lib/nampan.js` | Nampan, nomor meja, cara makan di `localStorage` (`dalu.*.v1`); pilihan radio dan multi-pilih |
| `components/Menu.js` | Cari, saring, bento paket, grid ubin, daftar minuman, lembar pilihan |
| `components/TabKategori.js` | Baris tab lengket dengan jumlah item dan scrollspy |
| `components/Mangkuk.js` | Ilustrasi mangkuk parametrik |
| `components/Nampan.js` | Bilah lengket, lembar nampan, pesan WhatsApp |
| `components/QR.js` | Kode QR SVG dari `qrcode` |

Satu rute (`/`), halaman 404 bergaya, `sitemap.xml`, `robots.txt`, Open Graph, dan ikon SVG.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000/?meja=7.

---

Dibuat oleh [PintuWeb](https://www.pintuweb.id), jasa pembuatan website.
