<?php

namespace TrustMedical\DiffView;

use Filament\Contracts\Plugin;
use Filament\Panel;

/**
 * DiffView Plugin class.
 * Used to register the plugin into the Filament v4 Panel.
 */
class DiffView implements Plugin
{
    /**
     * Get the unique identifier of the plugin.
     */
    public function getId(): string
    {
        return 'diff-view';
    }

    /**
     * Handle the registration of the plugin into the panel.
     */
    public function register(Panel $panel): void
    {
        //
    }

    /**
     * Handle the booting of the plugin within the panel.
     */
    public function boot(Panel $panel): void
    {
        //
    }

    /**
     * Create a new instance of the plugin using a static method.
     */
    public static function make(): static
    {
        return app(static::class);
    }
}
