# Example-landing

This is a Next.js project configured with TypeScript, MDX support, ESLint, Prettier, and Git hooks.

## Technologies Used

- [Next.js 15](https://nextjs.org/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/)
- **MDX**: Support for writing content in Markdown with JSX components.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v22
- [pnpm](https://pnpm.io/) v9

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:Valyay/example-landing.git
   cd example-landing
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

### Scripts

- `pnpm run dev`: Start the development server.
- `pnpm run build`: Build the application for production.
- `pnpm start`: Start the production server.
- `pnpm run lint`: Run ESLint to check for issues.
- `pnpm run lint:fix`: Run ESLint and fix issues.
- `pnpm run prettier`: Format code with Prettier.

## MDX Support

This project supports MDX for writing Markdown with React components. Use `.mdx` files to include JSX inside Markdown.

## Git Hooks

Git hooks are set up using `simple-git-hooks` to ensure code quality before commits. The `pre-commit` hook runs `lint-staged` to check staged files.

### Setting Up Git Hooks

After installing dependencies, `simple-git-hooks` automatically configures the hooks defined in `package.json`.

## Development Dependencies

- `@types/node` and `@types/react`: TypeScript type definitions.
- `eslint` and `eslint-config-next`: ESLint configurations for Next.js.
- `eslint-config-prettier`: Ensures ESLint and Prettier work together.
- `lint-staged`: Runs linters on staged files.
- `simple-git-hooks`: Lightweight Git hooks.

## Dependencies

- `next`, `react`, and `react-dom`: Core libraries for building the application.
- `@mdx-js/loader` and `@mdx-js/react`: Tools for MDX support.
