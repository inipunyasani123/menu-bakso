/**
 * Ilustrasi SVG mangkuk bakso tampak atas, parametrik per item (lib/data.js → `mangkuk`):
 * bakso (jumlah bola halus), urat (bertekstur), telur (bakso isi telur), jumbo, bakar (tusuk bakar di piring),
 * mie 'kuning' | 'tanpa', bihun, tahu, pangsit, ayam + sawi (mie ayam), kuah 'bening' | 'merah', tanpaKuah,
 * daun & bawang (taburan), piring (alas datar), kerupuk, nasi, telurRebus.
 * Semua warna tetap (bukan currentColor) supaya terlihat sama di ubin gelap maupun kertas terang.
 */

const POSISI = [[70, 88], [120, 80], [100, 126], [60, 128], [138, 124], [98, 78], [78, 112], [126, 104]];
const POSISI_JUMBO = [[100, 96], [60, 136], [140, 134]];

function Bakso({ x, y, r = 15, jenis = 'halus' }) {
  const warna = jenis === 'urat' ? '#9d8166' : '#bea78c';
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={warna} />
      <circle cx={x} cy={y} r={r} fill="none" stroke="#6e5641" strokeOpacity="0.45" strokeWidth="1.5" />
      <ellipse cx={x - r * 0.3} cy={y - r * 0.35} rx={r * 0.32} ry={r * 0.2} fill="#fff" opacity="0.35" />
      {jenis === 'urat' && (
        <g stroke="#6e5641" strokeWidth="1.6" strokeLinecap="round" opacity="0.8">
          <path d={`M${x - r * 0.5} ${y + r * 0.1} l${r * 0.35} ${r * 0.3}`} />
          <path d={`M${x + r * 0.1} ${y - r * 0.5} l${r * 0.3} ${r * 0.35}`} />
          <path d={`M${x + r * 0.2} ${y + r * 0.35} l${r * 0.3} -${r * 0.1}`} />
          <circle cx={x - r * 0.45} cy={y - r * 0.35} r="1.3" fill="#6e5641" stroke="none" />
          <circle cx={x + r * 0.5} cy={y + r * 0.05} r="1.3" fill="#6e5641" stroke="none" />
        </g>
      )}
      {jenis === 'telur' && (
        <g>
          <path d={`M${x - r} ${y} a${r} ${r} 0 0 0 ${2 * r} 0Z`} fill="#f7f0df" />
          <path d={`M${x - r * 0.62} ${y} a${r * 0.62} ${r * 0.62} 0 0 0 ${r * 1.24} 0Z`} fill="#f0b429" />
          <path d={`M${x - r} ${y} h${2 * r}`} stroke="#6e5641" strokeOpacity="0.4" strokeWidth="1.2" />
        </g>
      )}
      {jenis === 'jumbo' && (
        <g>
          <path d={`M${x - r * 0.9} ${y + r * 0.15} q${r * 0.9} -${r * 0.5} ${r * 1.8} 0`} fill="none" stroke="#6e5641" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
          <circle cx={x - r * 0.35} cy={y + r * 0.45} r={r * 0.22} fill="#a88c70" />
          <circle cx={x + r * 0.3} cy={y + r * 0.5} r={r * 0.2} fill="#a88c70" />
        </g>
      )}
    </g>
  );
}

function Tahu({ x, y, s = 30 }) {
  return (
    <g transform={`rotate(-12 ${x} ${y})`}>
      <rect x={x - s / 2} y={y - s * 0.4} width={s} height={s * 0.8} rx="5" fill="#e6c282" stroke="#b98a3e" strokeWidth="1.5" />
      <rect x={x - s / 2 + 5} y={y - s * 0.4 + 4} width={s - 10} height={s * 0.8 - 8} rx="3" fill="#f1d7a1" opacity="0.7" />
      <circle cx={x - s * 0.2} cy={y + s * 0.1} r="1.6" fill="#b98a3e" opacity="0.6" />
      <circle cx={x + s * 0.15} cy={y - s * 0.12} r="1.4" fill="#b98a3e" opacity="0.6" />
    </g>
  );
}

function Pangsit({ x, y, s = 1, sudut = 20 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${sudut}) scale(${s})`}>
      <path d="M-18 8 C -10 -8 2 -16 16 -10 C 12 -2 10 8 12 14 C 2 10 -8 10 -18 8Z" fill="#e8b764" stroke="#b97f2e" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M-8 4 C -2 -4 6 -8 12 -6" fill="none" stroke="#b97f2e" strokeWidth="1.2" opacity="0.7" />
    </g>
  );
}

function Mie({ jenis }) {
  const warna = jenis === 'bihun' ? '#f6efdc' : '#f1c24a';
  const tebal = jenis === 'bihun' ? 2.2 : 3.6;
  const jalur = [
    'M38 112 q22 -26 44 -4 t44 2 t34 -10',
    'M44 128 q18 -20 40 -6 t46 6 t30 -14',
    'M50 96 q24 -18 44 2 t42 -4 t26 10',
    'M40 140 q26 -14 48 2 t44 -6 t26 -8',
    'M60 84 q20 -10 38 6 t40 0',
  ];
  const ekstra = jenis === 'bihun' ? ['M46 120 q22 -24 42 -2 t46 4 t28 -12', 'M56 104 q20 -14 40 4 t44 -8'] : [];
  return (
    <g fill="none" stroke={warna} strokeWidth={tebal} strokeLinecap="round" opacity="0.95">
      {[...jalur, ...ekstra].map((d, i) => <path key={i} d={d} />)}
    </g>
  );
}

function Sawi() {
  return (
    <g fill="#5e9e3f" stroke="#3f7a2a" strokeWidth="1.2">
      <path d="M40 86 c6 -14 18 -18 30 -12 c-6 8 -14 14 -28 14Z" />
      <path d="M58 142 c2 -12 14 -16 26 -10 c-8 6 -14 10 -26 10Z" />
      <path d="M122 66 c8 -8 20 -8 26 2 c-10 4 -18 4 -26 -2Z" />
    </g>
  );
}

function Ayam() {
  const potongan = [[72, 108], [90, 120], [112, 108], [128, 124], [100, 96], [84, 130]];
  return (
    <g>
      {potongan.map(([x, y], i) => (
        <g key={i} transform={`rotate(${i * 37} ${x} ${y})`}>
          <rect x={x - 8} y={y - 6} width="16" height="12" rx="3" fill="#7f4f26" />
          <rect x={x - 6} y={y - 5} width="10" height="4" rx="2" fill="#a46b37" opacity="0.8" />
        </g>
      ))}
    </g>
  );
}

function Taburan({ daun = true, bawang = true, benih = 1 }) {
  const d = [[84, 72], [118, 94], [74, 136], [130, 140], [104, 110], [60, 100], [142, 82]];
  const b = [[96, 66], [66, 116], [136, 106], [112, 144], [88, 148], [126, 70]];
  return (
    <g>
      {daun && d.map(([x, y], i) => (
        <g key={`d${i}`} transform={`rotate(${(i * 53 + benih * 17) % 360} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="4.2" ry="3.2" fill="#a3d75a" stroke="#4d7f1e" strokeWidth="1.2" />
          <ellipse cx={x} cy={y} rx="1.6" ry="1.1" fill="#eaf7cf" />
        </g>
      ))}
      {bawang && b.map(([x, y], i) => (
        <rect key={`b${i}`} x={x - 3} y={y - 1.6} width="6" height="3.2" rx="1.2" fill="#c98a3a" transform={`rotate(${(i * 71 + benih * 29) % 180} ${x} ${y})`} />
      ))}
    </g>
  );
}

function Kuah({ warna, tanpaKuah }) {
  if (tanpaKuah) {
    return (
      <g>
        <circle cx="100" cy="106" r="74" fill="#7a4a24" />
        <ellipse cx="86" cy="80" rx="30" ry="12" fill="#fff" opacity="0.08" />
      </g>
    );
  }
  const merah = warna === 'merah';
  return (
    <g>
      <circle cx="100" cy="106" r="74" fill={merah ? '#c33f2b' : '#dfae55'} />
      <circle cx="100" cy="106" r="74" fill={merah ? '#8f2718' : '#b88430'} opacity="0.35" />
      <ellipse cx="84" cy="78" rx="34" ry="14" fill="#fff" opacity={merah ? 0.14 : 0.22} />
      {[[52, 128, 5], [146, 92, 4], [64, 150, 3], [142, 140, 3.5], [48, 96, 2.5]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={merah ? '#ff8a5c' : '#fff0c0'} opacity="0.45" />
      ))}
      {merah && (
        <g fill="#7c1b0f" opacity="0.6">
          <circle cx="76" cy="150" r="2" /><circle cx="130" cy="64" r="2.2" /><circle cx="150" cy="118" r="1.8" /><circle cx="54" cy="84" r="1.6" />
        </g>
      )}
    </g>
  );
}

function Bakar({ n = 5 }) {
  return (
    <g>
      {[0, 1].map((k) => (
        <g key={k} transform={`translate(${k * 18 - 9} ${k * 26 - 13}) rotate(-28 100 106)`}>
          <path d="M28 106 H178" stroke="#d9b98a" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M160 106 h22" stroke="#bfa070" strokeWidth="2" strokeLinecap="round" />
          {Array.from({ length: n }).map((_, i) => {
            const x = 50 + i * 24;
            return (
              <g key={i}>
                <circle cx={x} cy="106" r="11.5" fill="#8a4f2b" />
                <circle cx={x} cy="106" r="11.5" fill="none" stroke="#4a2814" strokeWidth="1.4" />
                <ellipse cx={x - 3} cy="101" rx="3.8" ry="2.2" fill="#ffb547" opacity="0.6" />
                <circle cx={x + 4} cy="110" r="2" fill="#3a1d0e" opacity="0.8" />
                <circle cx={x - 5} cy="109" r="1.4" fill="#3a1d0e" opacity="0.8" />
              </g>
            );
          })}
        </g>
      ))}
      <g fill="#c33f2b"><circle cx="146" cy="60" r="5" /><circle cx="56" cy="150" r="4" /><circle cx="150" cy="150" r="3.5" /></g>
    </g>
  );
}

function Kerupuk({ n }) {
  const pos = [[72, 92, -20], [120, 104, 30], [96, 136, 10]];
  return (
    <g>
      {pos.slice(0, n).map(([x, y, r], i) => (
        <g key={i} transform={`rotate(${r} ${x} ${y})`}>
          <path d={`M${x - 26} ${y - 4} c4 -20 26 -26 44 -14 c10 8 10 24 -2 30 c-14 8 -34 2 -42 -16Z`} fill="#f3e3bf" stroke="#d9c08a" strokeWidth="1.5" />
          {[[-10, -4], [4, -8], [10, 6], [-4, 8]].map(([dx, dy], j) => <circle key={j} cx={x + dx} cy={y + dy} r="2.2" fill="#fff8e8" />)}
        </g>
      ))}
    </g>
  );
}

function Nasi() {
  return (
    <g>
      <ellipse cx="100" cy="108" rx="52" ry="42" fill="#fbf6ea" stroke="#d9cdb5" strokeWidth="1.5" />
      {[[74, 92], [100, 80], [126, 94], [84, 120], [112, 126], [96, 104], [130, 118], [68, 112]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="4" ry="2.2" fill="#e9dfc8" transform={`rotate(${i * 40} ${x} ${y})`} />
      ))}
    </g>
  );
}

function TelurRebus() {
  return (
    <g>
      <ellipse cx="78" cy="108" rx="22" ry="29" fill="#f7f0df" stroke="#d9cdb5" strokeWidth="1.5" transform="rotate(-14 78 108)" />
      <g transform="rotate(16 126 106)">
        <ellipse cx="126" cy="106" rx="22" ry="29" fill="#f7f0df" stroke="#d9cdb5" strokeWidth="1.5" />
        <ellipse cx="126" cy="108" rx="13" ry="17" fill="#f0b429" />
        <ellipse cx="122" cy="102" rx="4" ry="5" fill="#fff" opacity="0.4" />
      </g>
    </g>
  );
}

export default function Mangkuk({ p = {}, className = '' }) {
  const {
    bakso = 0, urat = 0, telur = 0, jumbo = 0, bakar = 0,
    mie = 'tanpa', bihun = false, tahu = 0, pangsit = 0, ayam = false, sawi = false,
    kuah = 'bening', tanpaKuah = false, daun = true, bawang = true,
    piring = false, kerupuk = 0, nasi = false, telurRebus = 0,
  } = p;

  const bola = [
    ...Array.from({ length: jumbo }, () => 'jumbo'),
    ...Array.from({ length: telur }, () => 'telur'),
    ...Array.from({ length: urat }, () => 'urat'),
    ...Array.from({ length: bakso }, () => 'halus'),
  ];
  const posisi = jumbo ? POSISI_JUMBO : POSISI;
  const benih = bola.length + tahu * 3 + pangsit * 5;
  const alasPiring = piring || bakar > 0;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      {/* Alas: mangkuk melamin putih bergaris hijau, atau piring datar */}
      <circle cx="100" cy="106" r="94" fill="#efe4cf" />
      <circle cx="100" cy="106" r="94" fill="none" stroke="#5b536f" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="100" cy="106" r={alasPiring ? 80 : 86} fill="none" stroke="#3b8a72" strokeWidth={alasPiring ? 2.5 : 3.5} />
      {alasPiring ? (
        <circle cx="100" cy="106" r="72" fill="#f7efe0" />
      ) : (
        <>
          <circle cx="100" cy="106" r="78" fill="#d8c8aa" />
          <Kuah warna={kuah} tanpaKuah={tanpaKuah} />
        </>
      )}

      {/* Isi: lapisan bawah ke atas */}
      {!alasPiring && mie === 'kuning' && <Mie jenis="kuning" />}
      {!alasPiring && (bihun || mie === 'bihun') && <Mie jenis="bihun" />}
      {sawi && <Sawi />}
      {ayam && <Ayam />}
      {nasi && <Nasi />}
      {kerupuk > 0 && <Kerupuk n={kerupuk} />}
      {telurRebus > 0 && <TelurRebus />}
      {bakar > 0 && <Bakar n={bakar} />}

      {tahu > 0 && <Tahu x={piring ? 76 : 138} y={piring ? 100 : 72} s={piring ? 44 : 30} />}
      {tahu > 1 && <Tahu x={128} y={118} s={44} />}
      {pangsit > 0 && <Pangsit x={piring ? 70 : 58} y={piring ? 96 : 70} s={piring ? 1.5 : 1} sudut={piring ? -10 : 20} />}
      {pangsit > 1 && <Pangsit x={124} y={96} s={1.5} sudut={35} />}
      {pangsit > 2 && <Pangsit x={100} y={134} s={1.5} sudut={-40} />}

      {bola.map((jenis, i) => {
        const [x, y] = posisi[i % posisi.length];
        const r = jenis === 'jumbo' ? 38 : jenis === 'telur' ? 20 : jenis === 'urat' ? 16 : 15;
        return <Bakso key={i} x={x} y={y} r={r} jenis={jenis} />;
      })}

      {!alasPiring && !nasi && (daun || bawang) && <Taburan daun={daun} bawang={bawang && !tanpaKuah} benih={benih} />}
      {bakar > 0 && <Taburan daun={false} bawang benih={benih} />}

      {/* Uap tipis */}
      {!alasPiring && (
        <g fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.28">
          <path d="M70 18c0 6 6 6 6 12s-6 6-6 12" />
          <path d="M100 10c0 6 6 6 6 12s-6 6-6 12" />
          <path d="M130 18c0 6 6 6 6 12s-6 6-6 12" />
        </g>
      )}
    </svg>
  );
}
