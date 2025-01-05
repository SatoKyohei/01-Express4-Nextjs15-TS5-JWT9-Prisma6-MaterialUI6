import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import typescriptEslint from "@typescript-eslint/eslint-plugin";

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
    { ignores: ["node_modules/*", "dist/*", "build/*", "prisma/seed.ts"] },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {
            parser: tsParser,
            globals: {
                ...globals.commonjs,
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
        },
        plugins: {
            // @typescript-eslint/... から始まるルール設定時に必須
            "@typescript-eslint": typescriptEslint,
        },
        rules: {
            "no-unused-vars": "warn",
            semi: ["error", "always"],
            "no-console": ["error", { allow: ["error"] }],
            eqeqeq: "error",
            "@typescript-eslint/no-empty-object-type": "off",
        },
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },
    },

    // デフォルト設定
    // { languageOptions: { globals: globals.browser } },
    // pluginJs.configs.recommended,
    // ...tseslint.configs.recommended,
];

export default eslintConfig;
