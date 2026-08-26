import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    (
      <OgCard tagline="Студия разработки майнкрафт-серверов: сборки, плагины, сайты, сервер с нуля." />
    ),
    { ...size },
  );
}
