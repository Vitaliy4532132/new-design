// Изометрический блок — общий строительный кирпич нового дизайна.
// Тем же приёмом собран остров в build-sequence, поэтому секции выглядят
// частями одной системы, а не разными стилями на одной странице.

// Затемняем базовый цвет для боковых граней: из одного hex получается
// одинаковое освещение для любого цвета.
export function shade(hex: string, factor: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.round(((n >> 16) & 255) * factor);
  const g = Math.round(((n >> 8) & 255) * factor);
  const b = Math.round((n & 255) * factor);
  return `rgb(${r},${g},${b})`;
}

export function IsoCube({
  color,
  size,
  spin = false,
}: {
  color: string;
  size: number;
  spin?: boolean;
}) {
  // Пять граней: низ при взгляде сверху не виден ни у одного блока.
  const faces = [
    { transform: `translateZ(${size / 2}px)`, bg: color },
    { transform: `rotateX(90deg) translateZ(${size / 2}px)`, bg: shade(color, 0.72) },
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, bg: shade(color, 0.72) },
    { transform: `rotateY(90deg) translateZ(${size / 2}px)`, bg: shade(color, 0.52) },
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, bg: shade(color, 0.52) },
  ];

  return (
    <div
      className={`relative ${spin ? "animate-cube-spin" : ""}`}
      style={{
        width: size,
        height: size,
        transformStyle: "preserve-3d",
        ...(spin ? {} : { transform: "rotateX(58deg) rotateZ(45deg)" }),
      }}
    >
      {faces.map((f, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            transform: f.transform,
            background: f.bg,
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.3)",
          }}
        />
      ))}
    </div>
  );
}
