import tsParser from "@typescript-eslint/parser";

export default [
  // Ignorar artefactos de build y otras salidas
  {
    ignores: ["dist/**", "coverage/**", "tailwind.config.ts"],
  },
  // Reglas base para JS/JSX (parser por defecto)
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
  // Reglas para TS/TSX con parser de TypeScript y proyecto
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
  // Config específica para tailwind.config.ts (sin type-aware project)
  {
    files: ["tailwind.config.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  // Soporte para archivos de configuración CommonJS
  {
    files: ["postcss.config.cjs"],
    languageOptions: { sourceType: "script" },
    rules: {},
  },
  // Globals para tests (Jest / @testing-library)
  {
    files: ["**/*.test.*", "setupTests.*"],
    rules: {},
    linterOptions: { reportUnusedDisableDirectives: "error" },
  },
];