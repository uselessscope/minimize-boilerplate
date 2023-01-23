import { TaskStrategy } from "@/toolkits/core/task/task.types";

export interface StylesStrategy extends TaskStrategy {}

export enum StylesNameStrategy {
  CSS = "css",
  SASS = "sass",
  SCSS = "scss",
}

export enum StylesNameExtension {
  CSS = "css",
  SASS = "sass",
  SCSS = "scss",
}
