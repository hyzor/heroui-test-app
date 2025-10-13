# Agent Guidelines for HeroUI Next.js Project

## Commands

- **Build**: `npm run build` or `bun run build`
- **Dev**: `npm run dev` or `bun run dev` (uses Turbopack)
- **Lint**: `npm run lint` or `bun run lint` (ESLint with Prettier, auto-fix enabled)
- **Type Check**: `npx tsc --noEmit` (TypeScript strict mode)
- **Test**: No test framework configured yet

## Code Style

- **TypeScript**: Strict mode enabled, use interfaces/types for component props
- **Imports**: Group by type > builtin > external > internal (@/) > parent > sibling > index (ESLint enforced)
- **JSX**: Sort props (callbacks last, shorthand first, reserved first), self-closing tags required
- **Components**: Arrow functions preferred, "use client" directive for client components
- **Styling**: HeroUI components with clsx/tailwind-variants for conditional classes
- **Formatting**: Prettier integrated with ESLint, 2-space indentation
- **Naming**: camelCase for variables/functions, PascalCase for components/types
- **Error Handling**: try/catch for async operations, console.warn for non-critical issues
- **Padding**: Blank lines between statements, especially before returns and between variable declarations
