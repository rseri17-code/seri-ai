import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Ravikanth Seri | seri.ai";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

const signals = ["Signals", "Transactions", "Topology", "Evidence", "Hypotheses", "Eval gates", "Human review", "Memory"];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "linear-gradient(135deg, #080a0f 0%, #0d1721 45%, #09100e 100%)",
          color: "#eef4ff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: 64,
          position: "relative",
          width: "100%"
        }}
      >
        <div
          style={{
            background: "radial-gradient(circle, rgba(95, 242, 181, 0.22), transparent 60%)",
            height: 520,
            left: -120,
            position: "absolute",
            top: -170,
            width: 520
          }}
        />
        <div
          style={{
            background: "radial-gradient(circle, rgba(115, 167, 255, 0.18), transparent 60%)",
            height: 500,
            position: "absolute",
            right: -140,
            top: 40,
            width: 500
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
          <div style={{ border: "1px solid rgba(95, 242, 181, 0.32)", borderRadius: 999, color: "#5ff2b5", fontSize: 28, fontWeight: 700, padding: "14px 22px" }}>
            Ravikanth Seri
          </div>
          <div style={{ color: "#94a3b8", fontSize: 24, paddingTop: 16 }}>{site.owner}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ color: "#5ff2b5", fontSize: 30, fontWeight: 700, letterSpacing: 1.4, marginBottom: 26, textTransform: "uppercase" }}>
            Operational Intelligence
          </div>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: -1.5, lineHeight: 1.03, maxWidth: 920 }}>
            AI-native operations need evidence before action.
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 30, lineHeight: 1.35, marginTop: 30, maxWidth: 980 }}>
            An inspectable operating model for hypotheses, replay, evaluation gates, and accountable human review.
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, position: "relative" }}>
          {signals.map((signal, index) => (
            <div
              key={signal}
              style={{
                background: index % 3 === 0 ? "rgba(95, 242, 181, 0.12)" : index % 3 === 1 ? "rgba(115, 167, 255, 0.12)" : "rgba(243, 201, 105, 0.12)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 12,
                color: index % 3 === 0 ? "#5ff2b5" : index % 3 === 1 ? "#73a7ff" : "#f3c969",
                fontSize: 21,
                fontWeight: 700,
                padding: "14px 16px"
              }}
            >
              {signal}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
