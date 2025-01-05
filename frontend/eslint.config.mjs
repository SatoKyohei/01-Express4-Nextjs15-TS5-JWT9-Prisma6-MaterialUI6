import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

// パーサー
import tsParser from "@typescript-eslint/parser";

// プラグイン
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import pluginImport from "eslint-plugin-import";
import pluginReact from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    { ignores: [".next/*", "node_modules/*", "dist/*", "build/*"] },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.es2021,
                ...globals.node,
            },
        },
        parser: tsParser,
        rules: {
            "import/order": "error",
            "no-unused-vars": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
            semi: ["error", "always"],
            "no-console": ["error", { allow: ["error"] }],
            "react/jsx-sort-props": "error",
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "@typescript-eslint/no-empty-object-type": "off",
        },
        plugins: {
            "@typescript-eslint": pluginTypeScript,
            import: pluginImport,
            react: pluginReact,
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },
    {
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
];

export default eslintConfig;
