import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { projectId, dataset, apiVersion } from "./lib/env";

export default defineConfig({
  name: "amanda-domingues-beauty",
  title: "Amanda Domingues Beauty Studio",
  // projectId é público; o id real serve de fallback para o `sanity build/deploy`
  // standalone (o CLI do Sanity não carrega .env.local como o Next).
  projectId: projectId || "3a2j22ey",
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
