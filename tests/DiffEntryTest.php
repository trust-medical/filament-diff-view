<?php

namespace TrustMedical\DiffView\Tests;

use TrustMedical\DiffView\Infolists\Components\DiffEntry;

/**
 * Tests for the DiffEntry component.
 * Verifies unified diff generation logic and option management.
 */
class DiffEntryTest extends TestCase
{
    /**
     * Verify that a unified diff is correctly generated.
     */
    public function test_it_can_generate_a_unified_diff()
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
    public function test_it_returns_empty_string_if_both_are_empty()
    {
        $entry = DiffEntry::make('content')
            ->old('')
            ->new('');

        $this->assertSame('', $entry->getDiff());
    }

    /**
     * Verify that diff2html options are correctly configured and stored.
     */
    public function test_it_can_configure_diff2html_options()
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
     * Verify that file status tags can be hidden.
     */
    public function test_it_can_hide_file_tags()
    {
        $entry = DiffEntry::make('content')
            ->hideFileTags();

        $this->assertTrue($entry->getHideFileTags());
    }
}
