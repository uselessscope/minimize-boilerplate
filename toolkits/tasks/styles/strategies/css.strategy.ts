import { StylesStrategy } from "@/toolkits/tasks/styles/styles.types";

export class CssStrategy implements StylesStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
