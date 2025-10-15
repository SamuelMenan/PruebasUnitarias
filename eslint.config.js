export default [
  // Reglas base
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    rules: {
      // ejemplo: ajustar según preferencias
      "no-unused-vars": "warn",
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