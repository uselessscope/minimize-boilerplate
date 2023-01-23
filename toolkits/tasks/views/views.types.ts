import { TaskStrategy } from "@/toolkits/core/task/task.types";

export interface ViewsStrategy extends TaskStrategy {}

export enum ViewsNameStrategy {
  HTML = "html",
  PUG = "pug",
}

export enum ViewsNameExtension {
  HTML = "html",
  PUG = "pug",
}
