import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#071312",
          color: "#5FF2B5",
          display: "flex",
          fontSize: 84,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          letterSpacing: -2,
          width: "100%"
        }}
      >
        RS
      </div>
    ),
    size
  );
}
