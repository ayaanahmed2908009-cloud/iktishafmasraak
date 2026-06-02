---
name: Deployment build scope & gotchas
description: How production builds are scoped per-artifact, and which build failures are red herrings vs real deploy blockers
---

# Deployment build scope

Each artifact owns its production build in its own `.replit-artifact/artifact.toml` under `[services.production.build]` (e.g. landing builds via `pnpm --filter @workspace/landing run build`, api-server likewise). Deployment runs only those per-artifact builds, NOT the root `pnpm run build`.

**Why:** design-kind artifacts (the Canvas / `mockup-sandbox`) have NO `[services.production]` block at all, so they are never built or served in production.

**How to apply:** When a deploy fails, reproduce by building ONLY the deployable artifacts with their required env, not the root build:
- `PORT=5000 pnpm --filter @workspace/api-server run build`
- `PORT=5000 BASE_PATH=/ pnpm --filter @workspace/landing run build`

Root `pnpm run build` failing on `mockup-sandbox` with "PORT environment variable is required" is a **local-only red herring** — its `vite.config.ts` throws when `PORT`/`BASE_PATH` are unset, but it isn't part of deployment. Vite artifacts (landing, mockup-sandbox) also hard-require `PORT` and `BASE_PATH` at config-load time, so always set both when building from a bare shell.

# Express handler return-type gotcha (TS7030)

This repo's tsconfig enforces `noImplicitReturns`. In an Express route handler, do NOT mix `return res.status(...).json(...)` (early guard) with a bare `res.json(...)` (success path) — TS flags TS7030 "Not all code paths return a value" and the api-server build fails.

**How to apply:** make guards short-circuit without returning a value: `res.status(400).json(...); return;`. Keep all paths returning nothing.
