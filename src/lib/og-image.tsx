export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

export function OgCard({ tagline }: { tagline: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 900,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(23,151,255,0.55) 0%, rgba(10,63,255,0.15) 55%, transparent 75%)",
          display: "flex",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: 88,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "-2px",
        }}
      >
        TheFurry
        <span style={{ color: "#1797ff" }}>Dev</span>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 28,
          fontSize: 34,
          color: "#9a9aa3",
          maxWidth: 880,
          textAlign: "center",
        }}
      >
        {tagline}
      </div>
    </div>
  );
}
