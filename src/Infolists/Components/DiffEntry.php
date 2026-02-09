<?php

namespace TrustMedical\DiffView\Infolists\Components;

use Filament\Infolists\Components\Entry;
use SebastianBergmann\Diff\Differ;
use SebastianBergmann\Diff\Output\UnifiedDiffOutputBuilder;

/**
 * Custom Infolist entry for displaying diffs.
 * Compares two strings to generate a unified diff and renders it using diff2html on the frontend.
 */
class DiffEntry extends Entry
{
    /**
     * The Blade view used for rendering.
     */
    protected string $view = 'diff-view::infolists.components.diff-entry';

    /**
     * The original (old) text.
     */
    protected string|\Closure|null $old = null;

    /**
     * The modified (new) text.
     */
    protected string|\Closure|null $new = null;

    /**
     * Manually provided unified diff string.
     */
    protected string|\Closure|null $diff = null;

    /**
     * diff2html output format ('side-by-side' or 'line-by-line').
     */
    protected string|\Closure $outputFormat = 'side-by-side';

    /**
     * diff2html matching mode ('lines', 'words', or 'none').
     */
    protected string|\Closure $matching = 'lines';

    /**
     * Whether diff2html should draw a file list.
     */
    protected bool|\Closure $drawFileList = false;

    /**
     * Whether to hide diff2html file status tags (ADDED/CHANGED/DELETED/RENAMED).
     */
    protected bool|\Closure $hideFileTags = false;

    /**
     * Set the original (old) value.
     */
    public function old(string|\Closure|null $old): static
    {
        $this->old = $old;

        return $this;
    }

    /**
     * Set the modified (new) value.
     */
    public function new(string|\Closure|null $new): static
    {
        $this->new = $new;

        return $this;
    }

    /**
     * Set a pre-generated unified diff string.
     */
    public function diff(string|\Closure|null $diff): static
    {
        $this->diff = $diff;

        return $this;
    }

    /**
     * Set the diff2html output format.
     */
    public function outputFormat(string|\Closure $format): static
    {
        $this->outputFormat = $format;

        return $this;
    }

    /**
     * Set the diff2html matching mode.
     */
    public function matching(string|\Closure $matching): static
    {
        $this->matching = $matching;

        return $this;
    }

    /**
     * Set whether to draw the file list.
     */
    public function drawFileList(bool|\Closure $drawFileList = true): static
    {
        $this->drawFileList = $drawFileList;

        return $this;
    }

    /**
     * Hide diff2html file status tags (ADDED/CHANGED/DELETED/RENAMED).
     */
    public function hideFileTags(bool|\Closure $hideFileTags = true): static
    {
        $this->hideFileTags = $hideFileTags;

        return $this;
    }

    /**
     * Get the evaluated original (old) value.
     */
    public function getOld(): ?string
    {
        return $this->evaluate($this->old);
    }

    /**
     * Get the evaluated modified (new) value.
     */
    public function getNew(): ?string
    {
        return $this->evaluate($this->new);
    }

    /**
     * Get whether diff2html file status tags should be hidden.
     */
    public function getHideFileTags(): bool
    {
        return (bool) $this->evaluate($this->hideFileTags);
    }

    /**
     * Generate or retrieve the unified diff string.
     * Uses sebastian/diff to calculate the difference.
     */
    public function getDiff(): string
    {
        $diff = $this->evaluate($this->diff);

        if ($diff !== null) {
            return $diff;
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
     */
    public function getDiff2HtmlOptions(): array
    {
        return [
            'outputFormat' => $this->evaluate($this->outputFormat),
            'matching' => $this->evaluate($this->matching),
            'drawFileList' => $this->evaluate($this->drawFileList),
        ];
    }
}
