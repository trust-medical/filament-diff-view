import { defineConfig } from 'vite';
import path from 'path';

/**
 * Builds the DiffEntry Alpine component as a single ES module
 * (dist/components/diff-entry.js) plus its stylesheet (dist/diff-entry.css).
 * Both are registered with Filament and loaded only on pages that render a DiffEntry.
 */
export default defineConfig({
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        lib: {
            entry: path.resolve(__dirname, 'resources/js/index.js'),
            formats: ['es'],
            fileName: () => 'components/diff-entry.js',
            cssFileName: 'diff-entry',
        },
    },
});
