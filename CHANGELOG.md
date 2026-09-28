# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2026-09-28

See the [upgrade guide](README.md#from-20x-to-210) before updating.

### Added
- `colorScheme()` option (`'filament'`, `'light'`, `'dark'`, `'auto'`). The default `'filament'` follows the panel's dark mode.
- Project-wide defaults in `config/diff-view.php` (`output_format`, `matching`, `draw_file_list`, `hide_file_tags`, `color_scheme`).
- Fallback to the entry state: when none of `diff()`, `old()` or `new()` is set, the attribute named in `make()` is rendered as a unified diff.
- `old()`, `new()` and `diff()` accept `Stringable` values. Integers and floats returned from closures are cast to strings.
- Getters `getOutputFormat()`, `getMatching()`, `getDrawFileList()` and `getColorScheme()`, plus the `OUTPUT_FORMATS`, `MATCHING_MODES` and `COLOR_SCHEMES` constants.
- Support for `sebastian/diff` ^8.0. ^6.0 and ^7.0 remain supported, so projects on PHPUnit 11/12 (or Pest 3/4) can still install the package.
- Support for Laravel 12 (Orchestra Testbench 10) alongside Laravel 13.
- CI covers PHP 8.4/8.5 × Filament 4/5 × Laravel 12/13 (including sebastian/diff 6) and verifies that the compiled assets are up to date.

### Changed
- The entry renders inside Filament's standard entry wrapper, so labels, hints, helper text and extra attributes are displayed.
- Assets are lazy loaded with Filament's `x-load` / `x-load-css`. diff2html is downloaded only on pages that render a `DiffEntry`.
- The assets are registered as the `diff-entry` Alpine component and stylesheet. The previous `diff-view-scripts` / `diff-view-styles` assets were removed. **Run `php artisan filament:assets` after updating.**
- diff2html is no longer exposed as the global `window.Diff2Html`.
- Unsupported values for `outputFormat()`, `matching()` and `colorScheme()` throw an `InvalidArgumentException`.
- The Docker development image uses Node.js 22.

### Fixed
- The diff re-renders correctly when its content changes during a Livewire update.
- Removed the unused translation and migration registrations from the service provider.
- Fixed incorrect repository URLs, the license link and the example code in the README.

## [2.0.0]

### Changed
- Requires PHP 8.4 or later.
- Added support for Filament 5 (alongside Filament 4).

## [1.0.0] - 2026-01-28

### Added
- Initial release.
- `DiffEntry` component for Filament Infolists.
- Support for side-by-side and line-by-line diff views.
- Customization options (matching mode, file list, hiding file tags).
- Filament v4 support.

