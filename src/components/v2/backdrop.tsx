// Фоновые слои для секций. Без них внутренние страницы выглядят как
// одинаковые серые карточки на чёрном: нет ни глубины, ни смены ритма.
// Приёмы те же, что уже работают на главной, — вынесены, чтобы не копировать.

type Variant = "grid" | "dots" | "glow";

export function Backdrop({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  if (variant === "glow") {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute top-0 left-1/2 h-[420px] w-[900px] max-w-[150vw] -translate-x-1/2 opacity-20 blur-[130px] ${className}`}
        style={{ background: "radial-gradient(circle, #0A3FFF, transparent 70%)" }}
      />
    );
  }

  if (variant === "dots") {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 opacity-[0.05] ${className}`}
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(79,142,255,0.9) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
    );
  }

  // Сетка гаснет к краям, иначе линии упираются в границы секции и режут её.
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 opacity-[0.06] ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
      }}
    />
  );
}
