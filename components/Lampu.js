/**
 * Untaian lampu bohlam tenda: kabel melengkung dengan bohlam amber dan pendar lembut. Tanpa animasi kedip.
 * preserveAspectRatio "slice" membuat untaian memenuhi lebar layar apa pun.
 */
export default function Lampu({ className = '' }) {
  const bohlam = [];
  for (let x = 60; x < 1200; x += 110) bohlam.push(x);
  return (
    <svg viewBox="0 0 1200 56" className={className} preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false">
      <path
        d={bohlam.map((x, i) => (i === 0 ? `M0 6 Q ${x - 55} 22 ${x} 14` : `Q ${x - 55} 24 ${x} 14`)).join(' ') + ' Q 1175 24 1200 6'}
        fill="none" stroke="#5b536f" strokeWidth="2"
      />
      {bohlam.map((x, i) => {
        const y = 14 + (i % 2 ? 1 : 0);
        return (
          <g key={x}>
            <rect x={x - 3.5} y={y} width="7" height="7" rx="1.5" fill="#6d6584" />
            <circle cx={x} cy={y + 20} r="19" fill="var(--color-lampu)" opacity="0.14" />
            <circle cx={x} cy={y + 17} r="9" fill="var(--color-lampu)" />
            <circle cx={x - 3} cy={y + 13} r="2.5" fill="#fff3d6" opacity="0.9" />
          </g>
        );
      })}
    </svg>
  );
}
