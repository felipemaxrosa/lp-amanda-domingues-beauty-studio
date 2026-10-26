import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./lib/env";

export default defineCliConfig({
  api: { projectId: projectId || "placeholder", dataset },
  studioHost: "amandadominguesbeauty",
  deployment: { appId: "gphb26im6adqmkwwjr66b6oh" },
});
