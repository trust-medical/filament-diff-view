<?php

namespace TrustMedical\DiffView;

use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
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
     * Configure the package (name, config file, views, etc.).
     */
    public function configurePackage(Package $package): void
    {
        $package
            ->name('diff-view')
            ->hasConfigFile()
            ->hasViews()
            ->hasTranslations()
            ->hasMigrations();
    }

    /**
     * Handle tasks after the package has booted.
     * Registers Filament assets (Vite-compiled JS/CSS).
     */
    public function packageBooted(): void
    {
        FilamentAsset::register(
            [
                Css::make('diff-view-styles', __DIR__.'/../dist/index.css'),
                Js::make('diff-view-scripts', __DIR__.'/../dist/es/index.js'),
            ],
            package: 'trust-medical/diff-view'
        );
    }
}
