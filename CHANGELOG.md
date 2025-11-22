# Change Log

## [1.0.2] 2024-05-22

### Added
- Integrated the application with Cloudflare R2 for storing and serving static assets (images).
- Created a migration script (`server/npm run migrate`) to automatically upload local images to the R2 bucket.
- Generated `image_links.md`, a new file that lists all available images and their public R2 URLs for easy reference.
- Added support for a `.env` file in the `server/` directory for managing local development environment variables.

### Changed
- Updated the `README.md` with a comprehensive guide for local environment setup, including prerequisites, installation, R2 configuration, asset migration, and application execution steps.
- Corrected the Cloudflare R2 bucket name from `governance-system-assetes` to `governance-system-assets` in all relevant configurations.

### Fixed
- Resolved an R2 authentication issue by correctly loading environment variables for `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY`.

## [1.0.1] 2022-08-16

- Update eslint
- Update dependencies and dev dependencies
- Fix the issues with jsx and typescript
- Fix the conflict between eslint config and react-app eslint config
- Replace the github-button-react with github-button cdn
- Add the .env file to prevent from generating the sourcemap files
- Fix the key prop issue for the data-table component

## [1.0.0] 2022-02-14

### Original Release
