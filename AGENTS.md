# AI Coding Agent Instructions

This document provides essential context and instructions for AI coding agents (like Cline, Cursor, Roo-Code, or Antigravity) to effectively work on this repository.

## Project Overview

- **Purpose**: A Filament PHP v4 plugin that provides a `DiffEntry` component for Infolists to visualize text differences.
- **Tech Stack**:
    - **Backend**: PHP 8.2+, Laravel 11+, Filament v4.
    - **Diff Generation**: `sebastian/diff` (PHP side).
    - **Frontend**: `diff2html` (JS side), Alpine.js.
    - **Asset Management**: npm & Vite.
- **Key Dependencies**:
    - `filament/filament`: ^4.0
    - `sebastian/diff`: ^6.0
    - `diff2html`: ^3.4

## Core Components

- **`src/Infolists/Components/DiffEntry.php`**: The main Infolist entry class. Handles data evaluation and PHP-side diff generation.
- **`resources/views/infolists/components/diff-entry.blade.php`**: The Blade component that initializes Alpine.js and renders the diff using `diff2html`.
- **`src/FilamentDiffViewServiceProvider.php`**: Standard Laravel/Filament service provider. Registers assets from the `dist` directory.

## Development Workflows

### Docker Environment
Always use the provided Docker environment for consistent behavior.
- **App Container**: `filament-app`
- **DB Container**: `filament-db` (MySQL 8.0 on port 3307)

### Quality Control
- **Tests**: `docker exec filament-app vendor/bin/phpunit`
- **Static Analysis**: `docker exec filament-app vendor/bin/phpstan analyze`
- **Code Style**: `docker exec filament-app vendor/bin/pint`

### Asset Management
- **Building Assets**: `docker exec filament-app npm run build`
    - Source: `resources/js/index.js`, `resources/css/index.css`
    - Output: `dist/`

## Coding Rules

1. **Type Hinting**: Always use strict typing for methods and properties.
2. **DocBlocks**: Use English for all comments and DocBlocks.
3. **Fluent API**: Maintain Filament's fluent API style in the `DiffEntry` component.
4. **Filament v4 Standards**: Follow the new `Schema` architecture principles where applicable.

## Common Tasks for AI Agents
- **Adding Options**: If adding a new `diff2html` option, add a fluent method in `DiffEntry.php` and update the `getDiff2HtmlOptions` array. No JS changes are needed if the option is natively supported by `diff2html`.
- **Fixing Styles**: Edit `resources/css/index.css` and run `npm run build`.
