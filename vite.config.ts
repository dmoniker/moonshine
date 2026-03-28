import { readFile, writeFile } from "node:fs/promises";
import type { IncomingMessage, ServerResponse } from "node:http";
import { join } from "node:path";
import react from "@vitejs/plugin-react";
import type { Connect } from "vite";
import { defineConfig } from "vite";

const DATA_FILE = "distillation_progress.json";

/** Local-only persistence: read/write JSON in the project root (dev + `vite preview`). */
function localJsonApi(): {
  name: string;
  configureServer: (server: { middlewares: Connect.Server }) => void;
  configurePreviewServer: (server: { middlewares: Connect.Server }) => void;
} {
  const handle: Connect.NextHandleFunction = (
    req: IncomingMessage,
    res: ServerResponse,
    next: Connect.NextFunction
  ) => {
    if (!req.url?.startsWith("/api/quest-data")) {
      next();
      return;
    }
    const filePath = join(process.cwd(), DATA_FILE);

    if (req.method === "GET") {
      void (async () => {
        try {
          const raw = await readFile(filePath, "utf-8");
          res.setHeader("Content-Type", "application/json");
          res.end(raw);
        } catch {
          res.setHeader("Content-Type", "application/json");
          res.end("{}");
        }
      })();
      return;
    }

    if (req.method === "POST") {
      const chunks: Buffer[] = [];
      req.on("data", (c) => chunks.push(c as Buffer));
      req.on("end", () => {
        void (async () => {
          try {
            const body = Buffer.concat(chunks).toString("utf-8");
            JSON.parse(body);
            await writeFile(filePath, body, "utf-8");
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ ok: true }));
          } catch (e) {
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                ok: false,
                error: e instanceof Error ? e.message : "Invalid JSON",
              })
            );
          }
        })();
      });
      return;
    }

    res.statusCode = 405;
    res.end();
  };

  return {
    name: "distillation-quest-local-json",
    configureServer(server) {
      server.middlewares.use(handle);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle);
    },
  };
}

export default defineConfig({
  plugins: [react(), localJsonApi()],
});
