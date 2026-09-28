# AI Coding Agent Instructions

This document provides essential context and instructions for AI coding agents (like Claude Code, Cline, Cursor, Roo-Code, or Antigravity) to effectively work on this repository.

## Project Overview

- **Purpose**: A Filament plugin that provides a `DiffEntry` component for Infolists to visualize text differences.
- **Tech Stack**:
    - **Backend**: PHP 8.4+, Laravel 12/13, Filament 4/5.
    - **Diff Generation**: `sebastian/diff` (PHP side).
    - **Frontend**: `diff2html` (JS side), loaded as a Filament async Alpine component.
    - **Asset Management**: npm & Vite.
- **Key Dependencies**:
    - `filament/filament`: ^4.0|^5.0
    - `sebastian/diff`: ^6.0|^7.0|^8.0 (keep the wide range: it is shared with PHPUnit in consumer apps)
    - `diff2html`: ^3.4

## Core Components

- **`src/Infolists/Components/DiffEntry.php`**: The main Infolist entry class. Resolves the content (`diff()` > `old()`/`new()` > entry state), generates the unified diff, and validates/evaluates the diff2html options (falling back to `config/diff-view.php`).
- **`resources/views/infolists/components/diff-entry.blade.php`**: Renders inside Filament's entry wrapper and lazy loads the Alpine component via `x-load` / `x-load-src` / `x-load-css`.
- **`resources/js/index.js`**: The `diffEntryComponent` Alpine factory. It renders with diff2html and resolves the `'filament'` color scheme from the `dark` class on `<html>`.
- **`src/DiffViewServiceProvider.php`**: Registers the config, views and the `diff-entry` Alpine component and stylesheet (package name `trust-medical/diff-view`, see `DiffViewServiceProvider::ASSET_PACKAGE`).
- **`src/DiffView.php`**: Optional panel plugin class (currently a no-op).
- **`config/diff-view.php`**: Default option values.

## Development Workflows

### Docker Environment
Always use the provided Docker environment for consistent behavior, and run every command through `docker exec`.
- **Start**: `docker compose up -d app`
- **App Container**: `filament-app`
- **DB Container**: `filament-db` (MySQL 8.0 on port 3307, not required by the test suite)

### Quality Control
- **Tests**: `docker exec filament-app vendor/bin/phpunit`
- **Static Analysis**: `docker exec filament-app vendor/bin/phpstan analyze`
- **Code Style**: `docker exec filament-app vendor/bin/pint`

### Asset Management
- **Building Assets**: `docker exec filament-app npm run build`
    - Source: `resources/js/index.js` (imports `resources/css/index.css`)
    - Output: `dist/components/diff-entry.js`, `dist/diff-entry.css`
- `dist/` is committed. Always rebuild and commit it after changing JS/CSS. CI fails when it is stale.

## Coding Rules

1. **Type Hinting**: Always use strict typing for methods and properties.
2. **DocBlocks**: Use English for all comments and DocBlocks.
3. **Fluent API**: Maintain Filament's fluent API style in the `DiffEntry` component.
4. **Filament Standards**: Follow the `Schema` architecture principles and keep the code compatible with both Filament 4 and 5.

## Common Tasks for AI Agents
- **Adding Options**: If adding a new `diff2html` option:
    1. Add a nullable property, a fluent setter and a getter in `DiffEntry.php`. Validate the value against an allowed-values constant if it is an enum-like string.
    2. Add a default to `config/diff-view.php`.
    3. Include the option in `getDiff2HtmlOptions()`.
    4. Add tests, and document the option in README.md and CHANGELOG.md.
    No JS changes are needed if the option is natively supported by `diff2html`.
- **Fixing Styles**: Edit `resources/css/index.css` and run `npm run build`.
- **Releasing**: Bump `version` in `composer.json`, add a CHANGELOG entry, and tag `vX.Y.Z` after merging.
