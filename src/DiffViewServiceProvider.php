<?php

namespace TrustMedical\DiffView;

use Filament\Support\Assets\AlpineComponent;
use Filament\Support\Assets\Css;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

/**
 * Package Service Provider.
 * Responsible for registering config, views, and assets.
 */
class DiffViewServiceProvider extends PackageServiceProvider
{
    /**
     * The package name used for Filament asset registration.
     */
    public const ASSET_PACKAGE = 'trust-medical/diff-view';

    /**
     * Configure the package (name, config file, views).
     */
    public function configurePackage(Package $package): void
    {
        $package
            ->name('diff-view')
            ->hasConfigFile()
            ->hasViews();
    }

    /**
     * Handle tasks after the package has booted.
     * Registers the Vite-compiled assets, which are loaded only on pages that render a DiffEntry.
     */
    public function packageBooted(): void
    {
        FilamentAsset::register(
            [
                AlpineComponent::make('diff-entry', __DIR__.'/../dist/components/diff-entry.js'),
                Css::make('diff-entry', __DIR__.'/../dist/diff-entry.css')->loadedOnRequest(),
            ],
            package: self::ASSET_PACKAGE,
        );
    }
}
