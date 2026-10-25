"use client";

/**
 * Ambiente de edição (Sanity Studio) embutido em /studio.
 * Funciona assim que NEXT_PUBLIC_SANITY_PROJECT_ID estiver definido.
 */
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
