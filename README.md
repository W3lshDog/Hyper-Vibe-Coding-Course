# Hyper Vibe Coding Course

Course content + launch kit for **Vibe Coding Foundations (Course 1)**, including curriculum, email sequences, gamification, marketing assets, and a deployable landing page.

## Repository Structure

- `assets/` Static assets (images, logos, screenshots)
- `config/` Tooling configuration (CI lint configs, etc.)
- `docs/` Long-form documentation (future expansion)
- `src/` Source code (future expansion)
- `tests/` Tests (future expansion)

Root-level content:

- `01_COURSE1_COMPLETE_CURRICULUM.md` Full Course 1 curriculum
- `02_LANDING_PAGE.html` Static landing page
- `03_EMAIL_SEQUENCES.md` Email sequences (welcome, mini-course, launch)
- `04_GAMIFICATION_SYSTEM.md` Points, badges, leaderboard system
- `05_MARKETING_ASSETS.md` Reddit/Twitter/PH copy + positioning
- `06_4WEEK_LAUNCH_PLAN.md` Launch plan + infrastructure setup

## Quick Start

### View the landing page locally

Open [02_LANDING_PAGE.html](file:///h:/Hyper%20Vibe%20Coding%20Course/02_LANDING_PAGE.html) in your browser.

### Publish the landing page (GitHub Pages)

This repo includes a GitHub Pages deployment workflow. To enable it:

1. In GitHub, go to **Settings → Pages**
2. Under **Build and deployment**, select **GitHub Actions**
3. Push to `main` and the workflow will deploy

## Contribution Guidelines

### Branching (Git-flow style)

- `main`: always deployable (protected)
- `develop`: integration branch for upcoming release
- Feature branches: `feature/<short-name>`
- Fix branches: `fix/<short-name>`
- Release branches (optional): `release/<yyyy-mm-dd>` or `release/<version>`

### PR Rules (expected)

- Open all changes as PRs into `develop` (or `main` for urgent hotfixes)
- Keep PRs small and scoped
- Use descriptive titles and include screenshots for landing page changes
- CI must pass before merge

### Commit Messages

Use Conventional Commits:

- `feat: ...`
- `fix: ...`
- `docs: ...`
- `chore: ...`

### Local Checks

CI currently runs Markdown linting and Pages deploy. If you later add a frontend (`package.json`) or backend (`pyproject.toml`), extend the workflows to run the appropriate tests and typechecks.

## Repository Settings (Branch Protection)

Recommended branch protection for `main`:

- Require pull request reviews before merging (1+)
- Require status checks to pass before merging
  - `CI / markdownlint`
- Require linear history
- Require signed commits (optional, recommended)
- Block force pushes
- Do not allow deletions

Recommended branch protection for `develop`:

- Require status checks to pass before merging
  - `CI / markdownlint`
- Block force pushes

## License

Add a license file if/when you decide on licensing.

