import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import path from "node:path";
import fs from "node:fs";
import router from "./routes";
import { logger } from "./lib/logger";

// `landing`'s build output. `src/` and `dist/` sit at the same depth under
// `artifacts/api-server/`, so this relative path resolves correctly both in
// dev (this file loaded directly from src/) and in the bundled production
// output (dist/index.mjs), where import.meta.dirname reflects the bundle's
// own location.
const landingPublicDir = path.resolve(
  import.meta.dirname,
  "../../landing/dist/public",
);

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
// Anything under /api that wasn't matched above is a real 404, not a
// frontend route - answer it here so it doesn't fall through to the SPA
// fallback below.
app.use("/api", (_req, res) => {
  res.status(404).json({ message: "Not found" });
});

// Serve the built `landing` site (static assets + SPA fallback) from the
// same server/origin, so its relative `/api/...` fetches work without CORS
// or cross-domain config. Guarded by existsSync so this is a no-op in
// environments (e.g. plain `pnpm --filter @workspace/api-server run dev`)
// where landing hasn't been built.
if (fs.existsSync(landingPublicDir)) {
  app.use(express.static(landingPublicDir));
  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(landingPublicDir, "index.html"));
  });
}

export default app;
