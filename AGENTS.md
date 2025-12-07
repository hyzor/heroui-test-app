# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains App Router segments, route layouts, and server components; colocate page-level assets within each segment.
- `components/` stores reusable HeroUI-driven client widgets; split complex pieces into subfolders with an `index.ts` barrel when exports exceed two items.
- `config/` and `data/` hold runtime configuration and static content; update them instead of hardcoding strings in JSX.
- `styles/` defines the Tailwind layers and global CSS, while `public/` serves static media.
- Shared TypeScript contracts live in `types/`; prefer importing from there instead of duplicating interfaces.

## Build, Test, and Development Commands
- `bun run dev` launches the Next.js dev server with Turbopack for rapid feedback.
- `bun run build` performs a production compilation and static analysis; run before publishing changes.
- `bun run lint` auto-applies Prettier + ESLint fixes; rerun until the command exits cleanly.
- `bunx tsc --noEmit` verifies strict type safety without generating output; treat failures as blocking.
- `bun run start` serves the optimized build locally to mirror deployment behaviour.

## Coding Style & Naming Conventions
- TypeScript is strict; annotate props with dedicated interfaces/types and avoid `any`.
- Imports are grouped by type → builtin → external → `@/` aliases → relative paths; allow ESLint to reorder automatically.
- Use arrow functions for components, add `"use client"` only when stateful/browser APIs are needed, and keep callbacks as the last JSX props.
- Styling relies on Tailwind utility classes, `clsx`, and `tailwind-variants`; consolidate conditional logic in helper functions when it spans multiple props.
- Maintain 2-space indentation, camelCase for variables, and PascalCase for components, files, and directories that export React elements.

## Testing Guidelines
- No automated test runner ships yet; pair linting + type checks with manual UI verification covering new states and breakpoints.
- When adding tests, colocate them beside the implementation (`*.test.tsx`) and document the command required to run the suite in this guide.

## Commit & Pull Request Guidelines
- Follow Conventional Commit prefixes observed in history (`feat:`, `refactor:`, `fix:`, etc.) and write concise imperatives under 60 characters.
- Keep commits scoped to one change-set and include context in the body when behaviour shifts or data files update.
- Pull requests should summarise the impact, link relevant issues, list manual test steps, and attach UI screenshots or recordings when the layout changes.
