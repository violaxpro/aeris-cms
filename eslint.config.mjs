import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"], // opsional: scope file mana yang kena rules ini
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      // "@typescript-eslint/no-wrapper-object-type": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-duplicate-imports": "off",
      "react-hooks/exhaustive-deps": "off",
      "prefer-const": "off",
      "react-hooks/rules-of-hooks": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-duplicate-imports": "warn",
      "react/react-in-jsx-scope": "off",
      "react/no-unknown-property": "error",
    },
  },
];

export default eslintConfig;
