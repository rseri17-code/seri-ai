import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // react-hooks 7 (via eslint-config-next 16) errors on setState in effects.
      // These effects already sync the nav menu, Ask session restore, and the
      // Operations Room playback timer. Rewriting them is out of scope for the
      // framework upgrade.
      "react-hooks/set-state-in-effect": "off"
    }
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    "public/**",
    "tmp/**",
    "next-env.d.ts",
    "tsconfig.tsbuildinfo"
  ])
]);

export default eslintConfig;
