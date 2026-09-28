<?php

namespace TrustMedical\DiffView\Tests\Fixtures;

use Filament\Actions\Concerns\InteractsWithActions;
use Filament\Actions\Contracts\HasActions;
use Filament\Schemas\Concerns\InteractsWithSchemas;
use Filament\Schemas\Contracts\HasSchemas;
use Filament\Schemas\Schema;
use Livewire\Component;
use TrustMedical\DiffView\Infolists\Components\DiffEntry;

/**
 * Minimal Livewire component rendering an infolist with a DiffEntry.
 */
class DiffEntryPage extends Component implements HasActions, HasSchemas
{
    use InteractsWithActions;
    use InteractsWithSchemas;

    /**
     * Configure the infolist schema under test.
     */
    public function infolist(Schema $schema): Schema
    {
        return $schema
            ->constantState([
                'changes' => "--- a/file.txt\n+++ b/file.txt\n@@ -1 +1 @@\n-foo\n+bar\n",
            ])
            ->components([
                DiffEntry::make('changes')
                    ->label('Content changes')
                    ->outputFormat('line-by-line')
                    ->colorScheme('dark'),
            ]);
    }

    /**
     * Render the infolist.
     */
    public function render(): string
    {
        return <<<'BLADE'
            <div>
                {{ $this->infolist }}
            </div>
            BLADE;
    }
}
