import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

// eslint-config-next@16 exporta flat configs nativas (Linter.Config[]),
// por isso espalhamo-las diretamente — sem FlatCompat.
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      ".sanity/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
