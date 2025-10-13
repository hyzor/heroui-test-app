# Agent Guidelines for HeroUI Next.js Project

## Commands

- **Build**: `npm run build` or `bun run build`
- **Dev**: `npm run dev` or `bun run dev`
- **Lint**: `npm run lint` or `bun run lint`
- **No test framework configured yet**

## Code Style

- **TypeScript**: Strict mode enabled, use interfaces for component props
- **Imports**: Group by type > builtin > external > internal (@/) > parent > sibling > index
- **JSX**: Sort props (callbacks last, shorthand first), use self-closing tags
- **Components**: Use FC type, "use client" directive for client components
- **Styling**: HeroUI components with clsx for conditional classes
- **Formatting**: Prettier integrated with ESLint
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Error Handling**: Use try/catch for async operations, console.warn for non-critical issues
