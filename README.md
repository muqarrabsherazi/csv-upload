# CSV Project Starter Kit

This monorepo provides a minimal starting point for interns to build a **headless CSV upload** component, accompanying DSL schema, and sample applications.

## Monorepo layout

```
apps/
  example-app        # React SPA that consumes the CSV Upload headless component
  example-app-api    # Express API for backend examples
packages/
  csv-upload         # Headless CSV upload React component
  types              # Shared TypeScript types
```

The project is scaffolded with **pnpm workspaces** to enable fast, isolated builds and local package linking.

## Getting started

1. Install pnpm (if not installed):
   ```bash
   npm i -g pnpm
   ```
2. Install all dependencies:
   ```bash
   pnpm install
   ```
3. Run the React example app and API concurrently:
   ```bash
   pnpm --filter example-app dev
   pnpm --filter example-app-api dev
   ```

---

Happy hacking! 