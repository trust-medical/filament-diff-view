<?php

namespace TrustMedical\DiffView\Tests;

use Filament\FilamentServiceProvider;
use Livewire\LivewireServiceProvider;
use Orchestra\Testbench\TestCase as Orchestra;
use TrustMedical\DiffView\DiffViewServiceProvider;

/**
 * Base TestCase for the package.
 * Uses Orchestra Testbench to simulate the Filament and Laravel environment.
 */
class TestCase extends Orchestra
{
    /**
     * Define the package providers to load in the test environment.
     */
    protected function getPackageProviders($app)
    {
        return [
            LivewireServiceProvider::class,
            FilamentServiceProvider::class,
            DiffViewServiceProvider::class,
        ];
    }
}
