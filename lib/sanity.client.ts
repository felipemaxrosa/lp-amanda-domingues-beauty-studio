import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

// projectId "placeholder" mantém o createClient válido mesmo sem configuração;
// as queries só são executadas quando hasSanity === true (ver lib/content.ts).
export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});
