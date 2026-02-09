import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    build: {
        outDir: 'dist',
        lib: {
            entry: {
                index: path.resolve(__dirname, 'resources/js/index.js'),
            },
            name: 'DiffView',
            formats: ['es', 'cjs'],
            fileName: (format) => `${format}/[name].js`,
            cssFileName: 'style',
        },
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'style.css') return 'index.css';
                    return assetInfo.name;
                },
            },
        },
    },
});
