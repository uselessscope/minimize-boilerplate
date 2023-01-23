import { ViewsStrategy } from "@/toolkits/tasks/views/views.types";

export class PugStrategy implements ViewsStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
