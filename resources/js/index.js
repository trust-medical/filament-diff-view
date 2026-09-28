import '../css/index.css';
import { html } from 'diff2html';

/**
 * Alpine.js component that renders a unified diff with diff2html.
 * Loaded on demand through Filament's `x-load` / `x-load-src` mechanism.
 *
 * @param {{ diff: string, options: object, colorScheme: string }} config
 */
export default function diffEntryComponent({ diff, options, colorScheme }) {
    return {
        observer: null,

        renderedColorScheme: null,

        init() {
            this.render();

            // Re-render when the Filament panel's dark mode is toggled.
            if (colorScheme === 'filament') {
                this.observer = new MutationObserver(() => {
                    if (this.resolveColorScheme() !== this.renderedColorScheme) {
                        this.render();
                    }
                });
                this.observer.observe(document.documentElement, {
                    attributes: true,
                    attributeFilter: ['class'],
                });
            }
        },

        destroy() {
            this.observer?.disconnect();
            this.observer = null;
        },

        resolveColorScheme() {
            if (colorScheme !== 'filament') {
                return colorScheme;
            }

            return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        },

        render() {
            const container = this.$refs.container;

            if (!container) {
                return;
            }

            if (!diff) {
                container.innerHTML = '';

                return;
            }

            this.renderedColorScheme = this.resolveColorScheme();

            container.innerHTML = html(diff, {
                ...options,
                colorScheme: this.renderedColorScheme,
            });
        },
    };
}
