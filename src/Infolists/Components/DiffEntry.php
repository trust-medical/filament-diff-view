<?php

namespace TrustMedical\DiffView\Infolists\Components;

use Closure;
use Filament\Infolists\Components\Entry;
use InvalidArgumentException;
use SebastianBergmann\Diff\Differ;
use SebastianBergmann\Diff\Output\UnifiedDiffOutputBuilder;
use Stringable;

/**
 * Custom Infolist entry for displaying diffs.
 * Compares two strings to generate a unified diff and renders it using diff2html on the frontend.
 */
class DiffEntry extends Entry
{
    /**
     * Supported diff2html output formats.
     *
     * @var list<string>
     */
    public const OUTPUT_FORMATS = ['side-by-side', 'line-by-line'];

    /**
     * Supported diff2html line matching modes.
     *
     * @var list<string>
     */
    public const MATCHING_MODES = ['lines', 'words', 'none'];

    /**
     * Supported color schemes.
     * 'filament' follows the panel's dark mode toggle; the others are passed to diff2html as-is.
     *
     * @var list<string>
     */
    public const COLOR_SCHEMES = ['filament', 'light', 'dark', 'auto'];

    /**
     * The Blade view used for rendering.
     */
    protected string $view = 'diff-view::infolists.components.diff-entry';

    /**
     * The original (old) text.
     */
    protected mixed $old = null;

    /**
     * The modified (new) text.
     */
    protected mixed $new = null;

    /**
     * Manually provided unified diff string.
     */
    protected mixed $diff = null;

    /**
     * diff2html output format. Falls back to the config value when null.
     */
    protected string|Closure|null $outputFormat = null;

    /**
     * diff2html matching mode. Falls back to the config value when null.
     */
    protected string|Closure|null $matching = null;

    /**
     * Whether diff2html should draw a file list. Falls back to the config value when null.
     */
    protected bool|Closure|null $drawFileList = null;

    /**
     * Whether to hide diff2html file status tags. Falls back to the config value when null.
     */
    protected bool|Closure|null $hideFileTags = null;

    /**
     * Color scheme of the rendered diff. Falls back to the config value when null.
     */
    protected string|Closure|null $colorScheme = null;

    /**
     * Set the original (old) value.
     */
    public function old(string|Stringable|Closure|null $old): static
    {
        $this->old = $old;

        return $this;
    }

    /**
     * Set the modified (new) value.
     */
    public function new(string|Stringable|Closure|null $new): static
    {
        $this->new = $new;

        return $this;
    }

    /**
     * Set a pre-generated unified diff string.
     */
    public function diff(string|Stringable|Closure|null $diff): static
    {
        $this->diff = $diff;

        return $this;
    }

    /**
     * Set the diff2html output format ('side-by-side' or 'line-by-line').
     */
    public function outputFormat(string|Closure|null $format): static
    {
        $this->outputFormat = $format;

        return $this;
    }

    /**
     * Set the diff2html matching mode ('lines', 'words' or 'none').
     */
    public function matching(string|Closure|null $matching): static
    {
        $this->matching = $matching;

        return $this;
    }

    /**
     * Set whether to draw the file list.
     */
    public function drawFileList(bool|Closure|null $drawFileList = true): static
    {
        $this->drawFileList = $drawFileList;

        return $this;
    }

    /**
     * Hide diff2html file status tags (ADDED/CHANGED/DELETED/RENAMED).
     */
    public function hideFileTags(bool|Closure|null $hideFileTags = true): static
    {
        $this->hideFileTags = $hideFileTags;

        return $this;
    }

    /**
     * Set the color scheme ('filament', 'light', 'dark' or 'auto').
     */
    public function colorScheme(string|Closure|null $colorScheme): static
    {
        $this->colorScheme = $colorScheme;

        return $this;
    }

    /**
     * Get the evaluated original (old) value.
     */
    public function getOld(): ?string
    {
        return $this->normalizeString($this->evaluate($this->old), 'old');
    }

    /**
     * Get the evaluated modified (new) value.
     */
    public function getNew(): ?string
    {
        return $this->normalizeString($this->evaluate($this->new), 'new');
    }

    /**
     * Get the evaluated diff2html output format.
     */
    public function getOutputFormat(): string
    {
        return $this->validateOption(
            $this->evaluate($this->outputFormat) ?? config('diff-view.output_format', 'side-by-side'),
            self::OUTPUT_FORMATS,
            'outputFormat',
        );
    }

    /**
     * Get the evaluated diff2html matching mode.
     */
    public function getMatching(): string
    {
        return $this->validateOption(
            $this->evaluate($this->matching) ?? config('diff-view.matching', 'lines'),
            self::MATCHING_MODES,
            'matching',
        );
    }

    /**
     * Get whether the file list should be drawn.
     */
    public function getDrawFileList(): bool
    {
        return (bool) ($this->evaluate($this->drawFileList) ?? config('diff-view.draw_file_list', false));
    }

    /**
     * Get whether diff2html file status tags should be hidden.
     */
    public function getHideFileTags(): bool
    {
        return (bool) ($this->evaluate($this->hideFileTags) ?? config('diff-view.hide_file_tags', false));
    }

    /**
     * Get the evaluated color scheme.
     */
    public function getColorScheme(): string
    {
        return $this->validateOption(
            $this->evaluate($this->colorScheme) ?? config('diff-view.color_scheme', 'filament'),
            self::COLOR_SCHEMES,
            'colorScheme',
        );
    }

    /**
     * Generate or retrieve the unified diff string.
     *
     * Resolution order: diff() > old()/new() > the entry state (treated as a unified diff).
     */
    public function getDiff(): string
    {
        $diff = $this->normalizeString($this->evaluate($this->diff), 'diff');

        if ($diff !== null) {
            return $diff;
        }

        if ($this->old === null && $this->new === null) {
            return $this->normalizeString($this->getState(), 'state') ?? '';
        }

        $old = $this->getOld() ?? '';
        $new = $this->getNew() ?? '';

        if ($old === '' && $new === '') {
            return '';
        }

        $builder = new UnifiedDiffOutputBuilder(addLineNumbers: true);
        $differ = new Differ($builder);

        return $differ->diff($old, $new);
    }

    /**
     * Get options to be passed to diff2html on the frontend.
     *
     * The 'filament' color scheme is resolved on the client side, so it is not included here.
     *
     * @return array<string, mixed>
     */
    public function getDiff2HtmlOptions(): array
    {
        return [
            'outputFormat' => $this->getOutputFormat(),
            'matching' => $this->getMatching(),
            'drawFileList' => $this->getDrawFileList(),
        ];
    }

    /**
     * Normalize an evaluated value into a nullable string.
     */
    protected function normalizeString(mixed $value, string $name): ?string
    {
        if ($value === null || is_string($value)) {
            return $value;
        }

        if ($value instanceof Stringable || is_int($value) || is_float($value)) {
            return (string) $value;
        }

        throw new InvalidArgumentException(sprintf(
            'The [%s] value of [%s] must be a string, Stringable or null, [%s] given.',
            $name,
            static::class,
            get_debug_type($value),
        ));
    }

    /**
     * Ensure that an option value is one of the allowed values.
     *
     * @param  list<string>  $allowed
     */
    protected function validateOption(mixed $value, array $allowed, string $name): string
    {
        if (! in_array($value, $allowed, true)) {
            throw new InvalidArgumentException(sprintf(
                'Invalid [%s] value [%s]. Allowed values: %s.',
                $name,
                is_scalar($value) ? (string) $value : get_debug_type($value),
                implode(', ', $allowed),
            ));
        }

        return $value;
    }
}
