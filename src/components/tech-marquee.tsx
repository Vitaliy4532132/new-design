const TECHNOLOGIES = [
  "Java",
  "Kotlin",
  "Spigot API",
  "Paper API",
  "Velocity",
  "BungeeCord",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Gradle",
  "Maven",
];

export function TechMarquee() {
  const loop = [...TECHNOLOGIES, ...TECHNOLOGIES];

  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-background py-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />
      <div className="flex w-max animate-marquee gap-16">
        {loop.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="font-mono text-lg tracking-wider text-text-muted/40 uppercase"
          >
            {tech}
          </span>
        ))}
      </div>
    </section>
  );
}
