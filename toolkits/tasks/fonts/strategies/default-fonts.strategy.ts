import { FontsStrategy } from "@/toolkits/tasks/fonts/fonts.types";

export class DefaultFontsStrategy implements FontsStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
