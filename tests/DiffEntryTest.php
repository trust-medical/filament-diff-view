<?php

namespace TrustMedical\DiffView\Tests;

use Illuminate\Support\Str;
use InvalidArgumentException;
use Livewire\Livewire;
use PHPUnit\Framework\Attributes\DataProvider;
use TrustMedical\DiffView\Infolists\Components\DiffEntry;
use TrustMedical\DiffView\Tests\Fixtures\DiffEntryPage;

/**
 * Tests for the DiffEntry component.
 * Verifies unified diff generation logic, option management and rendering.
 */
class DiffEntryTest extends TestCase
{
    /**
     * Verify that a unified diff is correctly generated.
     */
    public function test_it_can_generate_a_unified_diff(): void
    {
        $old = "Hello World\nLine 2";
        $new = "Hello PHP\nLine 2\nLine 3";

        $entry = DiffEntry::make('content')
            ->old($old)
            ->new($new);

        $diff = $entry->getDiff();

        // Check for standard unified diff headers and symbols
        $this->assertStringContainsString('--- Original', $diff);
        $this->assertStringContainsString('+++ New', $diff);
        $this->assertStringContainsString('-Hello World', $diff);
        $this->assertStringContainsString('+Hello PHP', $diff);
        $this->assertStringContainsString('+Line 3', $diff);
    }

    /**
     * Verify that an empty string is returned if both values are empty.
     */
    public function test_it_returns_empty_string_if_both_are_empty(): void
    {
        $entry = DiffEntry::make('content')
            ->old('')
            ->new('');

        $this->assertSame('', $entry->getDiff());
    }

    /**
     * Verify that a manually provided diff takes precedence over old/new values.
     */
    public function test_manual_diff_takes_precedence(): void
    {
        $entry = DiffEntry::make('content')
            ->diff('manual diff')
            ->old('a')
            ->new('b');

        $this->assertSame('manual diff', $entry->getDiff());
    }

    /**
     * Verify that the entry state is used as a unified diff when nothing else is provided.
     */
    public function test_it_falls_back_to_the_state(): void
    {
        $entry = DiffEntry::make('content')
            ->state("--- a/x\n+++ b/x\n");

        $this->assertSame("--- a/x\n+++ b/x\n", $entry->getDiff());
    }

    /**
     * Verify that closures and Stringable values are normalized to strings.
     */
    public function test_it_normalizes_closures_and_stringables(): void
    {
        $entry = DiffEntry::make('content')
            ->old(fn (): string => 'foo')
            ->new(Str::of('bar'));

        $this->assertSame('foo', $entry->getOld());
        $this->assertSame('bar', $entry->getNew());
        $this->assertStringContainsString('+bar', $entry->getDiff());
    }

    /**
     * Verify that unsupported value types are rejected.
     */
    public function test_it_rejects_unsupported_value_types(): void
    {
        $entry = DiffEntry::make('content')
            ->old(fn (): array => ['foo']);

        $this->expectException(InvalidArgumentException::class);

        $entry->getOld();
    }

    /**
     * Verify that diff2html options are correctly configured and stored.
     */
    public function test_it_can_configure_diff2html_options(): void
    {
        $entry = DiffEntry::make('content')
            ->outputFormat('line-by-line')
            ->matching('none')
            ->drawFileList();

        $options = $entry->getDiff2HtmlOptions();

        $this->assertSame('line-by-line', $options['outputFormat']);
        $this->assertSame('none', $options['matching']);
        $this->assertTrue($options['drawFileList']);
    }

    /**
     * Verify the default option values.
     */
    public function test_it_has_sensible_defaults(): void
    {
        $entry = DiffEntry::make('content');

        $this->assertSame([
            'outputFormat' => 'side-by-side',
            'matching' => 'lines',
            'drawFileList' => false,
        ], $entry->getDiff2HtmlOptions());
        $this->assertFalse($entry->getHideFileTags());
        $this->assertSame('filament', $entry->getColorScheme());
    }

    /**
     * Verify that default option values can be changed through the config file.
     */
    public function test_defaults_can_be_configured(): void
    {
        config()->set('diff-view.output_format', 'line-by-line');
        config()->set('diff-view.matching', 'words');
        config()->set('diff-view.draw_file_list', true);
        config()->set('diff-view.hide_file_tags', true);
        config()->set('diff-view.color_scheme', 'auto');

        $entry = DiffEntry::make('content');

        $this->assertSame('line-by-line', $entry->getOutputFormat());
        $this->assertSame('words', $entry->getMatching());
        $this->assertTrue($entry->getDrawFileList());
        $this->assertTrue($entry->getHideFileTags());
        $this->assertSame('auto', $entry->getColorScheme());

        // Fluent methods still override the config.
        $this->assertSame('side-by-side', $entry->outputFormat('side-by-side')->getOutputFormat());
    }

    /**
     * Verify that invalid option values are rejected.
     */
    #[DataProvider('invalidOptionProvider')]
    public function test_it_rejects_invalid_option_values(string $method, string $getter): void
    {
        $entry = DiffEntry::make('content')->{$method}('invalid');

        $this->expectException(InvalidArgumentException::class);

        $entry->{$getter}();
    }

    /**
     * @return array<string, array{string, string}>
     */
    public static function invalidOptionProvider(): array
    {
        return [
            'outputFormat' => ['outputFormat', 'getOutputFormat'],
            'matching' => ['matching', 'getMatching'],
            'colorScheme' => ['colorScheme', 'getColorScheme'],
        ];
    }

    /**
     * Verify that file status tags can be hidden.
     */
    public function test_it_can_hide_file_tags(): void
    {
        $entry = DiffEntry::make('content')
            ->hideFileTags();

        $this->assertTrue($entry->getHideFileTags());
    }

    /**
     * Verify that the entry renders inside the Filament entry wrapper with the lazy-loaded Alpine component.
     */
    public function test_it_renders_the_entry(): void
    {
        Livewire::test(DiffEntryPage::class)
            ->assertSee('Content changes')
            ->assertSeeHtml('x-load-src=')
            ->assertSeeHtml('components/diff-entry.js')
            ->assertSeeHtml('diffEntryComponent(')
            ->assertSeeHtml('line-by-line')
            ->assertSeeHtml('+bar');
    }
}
