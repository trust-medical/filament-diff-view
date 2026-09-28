# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The shared agent instructions (stack, core components, commands, coding rules) live in AGENTS.md and are imported here:

@AGENTS.md

## Commands (run inside Docker)

Run every command in the `filament-app` container (`docker compose up -d app` first). Do not use the host toolchain.

```bash
docker exec filament-app vendor/bin/phpunit                                  # all tests
docker exec filament-app vendor/bin/phpunit --filter test_it_renders_the_entry  # single test
docker exec filament-app vendor/bin/phpstan analyze --no-progress            # src, config, tests (level 5)
docker exec filament-app vendor/bin/pint                                     # use --test to only check
docker exec filament-app npm ci && docker exec filament-app npm run build    # rebuild dist/
```

`docker-compose.yml` sets `HOME=/tmp`. Without it, npm fails because the container user has no writable home directory.

## Architecture notes that span several files

- **Asset contract between PHP, Blade and JS.**
  - `DiffViewServiceProvider` registers an `AlpineComponent` and a `Css` asset, both with the id `diff-entry`, under `DiffViewServiceProvider::ASSET_PACKAGE`.
  - The Blade view looks these up with `FilamentAsset::getAlpineComponentSrc()` / `getStyleHref()` and calls `diffEntryComponent({...})`.
  - `diffEntryComponent` is the default export of `resources/js/index.js`.
  - `vite.config.js` must keep emitting exactly `dist/components/diff-entry.js` and `dist/diff-entry.css`.
  - If you rename any of these ids, paths or the export, change all four files together.
- **Where options are resolved.** PHP evaluates and validates all options (fluent value → `config('diff-view.*')` → hard default) and passes them to JS as JSON. The only exception is `colorScheme: 'filament'`, which JS resolves at runtime from the `dark` class on `<html>`, using a `MutationObserver` to follow theme changes. For that reason, `getDiff2HtmlOptions()` deliberately omits `colorScheme`.
- **Re-rendering.** The diff container is `wire:ignore`, so its `wire:key` includes `md5($diff)`. When the content changes, Livewire replaces the element and Alpine re-initializes it.
- **Entry state fallback.** `DiffEntry::getDiff()` calls `getState()` only when `diff`, `old` and `new` are all unset. In unit tests without a schema container, set `->state(...)`, otherwise `getState()` throws.

## Testing gotchas

- In `tests/TestCase.php`, `LivewireServiceProvider` must be registered **after** Filament's `SupportServiceProvider`, which overrides Livewire's `DataStore`. The wrong order makes every Livewire render fail with `ViewErrorBag::put(): Argument #2 must be of type MessageBag, null given`.
- Rendering tests use the `tests/Fixtures/DiffEntryPage` Livewire component (`HasSchemas` + `HasActions`) together with `Livewire::test(...)`.
- PHPUnit 13 is used locally. Use attributes such as `#[DataProvider]`, not docblock annotations.

## Compatibility and release constraints

- Keep `sebastian/diff` at `^6.0|^7.0|^8.0`. It is shared with PHPUnit in consumer apps, so narrowing the range breaks installs on PHPUnit 11/12 (Pest 3/4) projects. CI runs one job against sebastian/diff 6.
- CI (`.github/workflows/tests.yml`) tests PHP 8.4/8.5 × Filament 4/5 × Laravel 12/13 (Testbench 10/11). Code must work with both Livewire 3 (Filament 4) and Livewire 4 (Filament 5).
- `dist/` and `package-lock.json` are committed. The `assets` CI job rebuilds with `npm ci` and fails if `dist/` changes.
- `.gitattributes` export-ignores everything that is not needed at runtime. Only `src/`, `config/`, `resources/views/`, `dist/`, `composer.json` and the top-level docs ship. When adding a runtime file elsewhere, update `.gitattributes`.
- The version is tracked in the `version` field of `composer.json` (currently 2.1.0) and in CHANGELOG.md. User-facing behavior changes also need an entry in the README "Upgrading" section.
