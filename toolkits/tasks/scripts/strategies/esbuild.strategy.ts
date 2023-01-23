import { ScriptsStrategy } from "@/toolkits/tasks/scripts/scripts.types";

export class EsbuildStrategy implements ScriptsStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
