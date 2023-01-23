import { ViewsStrategy } from "@/toolkits/tasks/views/views.types";

export class HtmlStrategy implements ViewsStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
