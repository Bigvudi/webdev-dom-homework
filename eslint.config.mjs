import js from '@eslint/js';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier'; // конфиг, отключающий правила
import prettierPlugin from 'eslint-plugin-prettier'; // плагин, запускающий prettier
import { defineConfig } from 'eslint/config';

export default defineConfig([
    js.configs.recommended, // Базовые рекомендации JS
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
        plugins: {
            prettier: prettierPlugin, // Подключаем плагин
        },
        rules: {
            ...prettierConfig.rules, // Отключаем конфликтующие правила
            'prettier/prettier': 'error', // Включаем проверку форматирования как ошибку ESLint
        },
    },
]);
