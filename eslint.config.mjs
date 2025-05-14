import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Spread the extended configurations from Next.js and TypeScript
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Add a new config object to override rules
  {
    files: ["**/*.ts", "**/*.tsx"], // Target TypeScript files
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // Disable the no-explicit-any rule
    },
  },
];

export default eslintConfig;