import QRCode from 'qrcode';

/**
 * Kode QR sebagai SVG inline (dibuat saat build oleh paket `qrcode`), diwarnai lewat currentColor.
 * Di warung sungguhan, QR inilah yang dicetak sebagai stiker meja dengan ?meja=<nomor>.
 */
export default async function QR({ url, className = '', label }) {
  const svg = await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' });
  const viewBox = svg.match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 29 29';
  const d = svg.match(/<path[^>]*stroke="#000000"[^>]*d="([^"]+)"/)?.[1] ?? '';
  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={label ?? `Kode QR menuju ${url}`} shapeRendering="crispEdges">
      <path d={d} stroke="currentColor" fill="none" />
    </svg>
  );
}
