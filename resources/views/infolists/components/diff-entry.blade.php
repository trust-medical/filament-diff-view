@php
    use Filament\Support\Facades\FilamentAsset;
    use TrustMedical\DiffView\DiffViewServiceProvider;

    $diff = $getDiff();
@endphp

<x-dynamic-component :component="$getEntryWrapperView()" :entry="$entry">
    @if (filled($diff))
        <div
            wire:ignore
            wire:key="{{ $getKey() ?? $getStatePath() }}.{{ md5($diff) }}"
            x-load
            x-load-src="{{ FilamentAsset::getAlpineComponentSrc('diff-entry', DiffViewServiceProvider::ASSET_PACKAGE) }}"
            x-load-css="[@js(FilamentAsset::getStyleHref('diff-entry', DiffViewServiceProvider::ASSET_PACKAGE))]"
            x-data="diffEntryComponent({
                diff: @js($diff),
                options: @js($getDiff2HtmlOptions()),
                colorScheme: @js($getColorScheme()),
            })"
            {{
                $getExtraAttributeBag()->class([
                    'fi-diff-entry',
                    'd2h-hide-tags' => $getHideFileTags(),
                ])
            }}
        >
            <div x-ref="container"></div>
        </div>
    @endif
</x-dynamic-component>
