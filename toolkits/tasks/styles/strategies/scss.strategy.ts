import { StylesStrategy } from "@/toolkits/tasks/styles/styles.types";

export class ScssStrategy implements StylesStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
