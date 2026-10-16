import './globals.css';
import { Alfa_Slab_One, Barlow } from 'next/font/google';
import { site, kategori, itemKategori, menu } from '@/lib/data';

const alfa = Alfa_Slab_One({ weight: '400', subsets: ['latin'], variable: '--font-alfa', display: 'swap' });
const barlow = Barlow({ weight: ['400', '500', '600', '700'], subsets: ['latin'], variable: '--font-barlow', display: 'swap' });

const HARI = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const jam24 = (j) => j.replace('.', ':');
const harga = menu.map((m) => m.harga);

// Restaurant + Menu/MenuSection/MenuItem: struktur menu terbaca mesin pencari.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: site.nama,
  url: site.url,
  description: site.deskripsi,
  servesCuisine: ['Bakso', 'Mie Ayam'],
  priceRange: `Rp${Math.min(...harga).toLocaleString('id-ID')}–Rp${Math.max(...harga).toLocaleString('id-ID')}`,
  address: { '@type': 'PostalAddress', streetAddress: 'Jl. Urip Sumoharjo (seberang Pasar Gede), Jebres', addressLocality: 'Surakarta', addressRegion: 'Jawa Tengah', addressCountry: 'ID' },
  openingHoursSpecification: site.jam.map((j) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: j.hari.map((h) => HARI[h]), opens: jam24(j.buka), closes: jam24(j.tutup) })),
  hasMenu: {
    '@type': 'Menu',
    name: `Menu ${site.nama}`,
    inLanguage: 'id-ID',
    hasMenuSection: kategori.map((k) => ({
      '@type': 'MenuSection',
      name: k.nama,
      description: k.catatan,
      hasMenuItem: itemKategori(k.id).map((m) => ({
        '@type': 'MenuItem',
        name: m.nama,
        description: m.deskripsi,
        offers: { '@type': 'Offer', price: m.harga, priceCurrency: 'IDR', availability: m.habis ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock' },
      })),
    })),
  },
};

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.judul, template: `%s · ${site.nama}` },
  description: site.deskripsi,
  applicationName: site.nama,
  keywords: ['menu digital', 'qr menu', 'menu warung bakso', 'bakso solo', 'demo menu digital'],
  authors: [{ name: 'PintuWeb', url: 'https://www.pintuweb.id' }],
  creator: 'PintuWeb',
  publisher: 'PintuWeb',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: site.url,
    siteName: site.nama,
    title: site.judul,
    description: site.deskripsi,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `Menu digital ${site.nama}: bakso, mie ayam, dan paket hemat dengan harga` }],
  },
  twitter: { card: 'summary_large_image', title: site.judul, description: site.deskripsi, images: ['/og.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
};

export const viewport = { themeColor: '#141220', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${alfa.variable} ${barlow.variable}`}>
      <body className="antialiased">
        <a href="#isi" className="sr-only-fokus fixed left-3 top-3 z-[70] rounded-[10px] bg-lampu px-4 py-2 font-bold text-malam">
          Langsung ke menu
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href={`https://www.pintuweb.id/kontak?demo=${site.slug}`} style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}>Buat yang seperti ini →</a>
        </aside>
      </body>
    </html>
  );
}
