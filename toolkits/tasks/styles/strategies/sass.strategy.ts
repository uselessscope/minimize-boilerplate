import { StylesStrategy } from "@/toolkits/tasks/styles/styles.types";

export class SassStrategy implements StylesStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
