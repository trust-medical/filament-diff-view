# Contributing

Contributions are welcome, and they are greatly appreciated! Every little bit helps, and credit will always be given.

## Bug Reports

When reporting a bug, please include:

* Your operating system name and version.
* Any details about your local setup that might be helpful in troubleshooting.
* Detailed steps to reproduce the bug.

## Feature Requests

When requesting a feature, please include:

* A concise description of the feature you want.
* The reason why you think it would be useful.

## Pull Requests

1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Commit your changes.
4. Push your branch to GitHub.
5. Create a Pull Request.

### Development Environment

Use the provided Docker environment and run all commands inside the `filament-app` container:

```bash
docker compose up -d app
docker exec filament-app composer install
docker exec filament-app npm ci
```

### Code Style

Please use [Laravel Pint](https://github.com/laravel/pint) to format your code.

```bash
docker exec filament-app vendor/bin/pint
```

### Static Analysis

Please use [Larastan](https://github.com/larastan/larastan) for static analysis.

```bash
docker exec filament-app vendor/bin/phpstan analyze
```

### Testing

Please add tests for any new features or bug fixes.

```bash
docker exec filament-app vendor/bin/phpunit
```

### Frontend Assets

The compiled assets in `dist/` are committed. If you change `resources/js` or `resources/css`, rebuild and include `dist/` in your pull request:

```bash
docker exec filament-app npm run build
```

### Changelog

Add a short entry for user-facing changes to [CHANGELOG.md](CHANGELOG.md).
