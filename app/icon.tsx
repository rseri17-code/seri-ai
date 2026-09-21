import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#071312",
          color: "#5FF2B5",
          display: "flex",
          fontSize: 15,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          letterSpacing: -0.6,
          width: "100%"
        }}
      >
        RS
      </div>
    ),
    size
  );
}
