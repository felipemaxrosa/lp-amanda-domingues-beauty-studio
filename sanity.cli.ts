import { defineCliConfig } from "sanity/cli";
import { projectId, dataset } from "./lib/env";

export default defineCliConfig({
  api: { projectId: projectId || "3a2j22ey", dataset },
  studioHost: "amandadominguesbeauty",
  deployment: { appId: "gphb26im6adqmkwwjr66b6oh" },
});
