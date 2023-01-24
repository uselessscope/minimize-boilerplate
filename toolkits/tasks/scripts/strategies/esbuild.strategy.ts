import { ScriptsStrategy } from "@/toolkits/tasks/scripts/scripts.types";

export class EsbuildStrategy implements ScriptsStrategy {
  precompile(): void {}

  compile(): void {}
}
