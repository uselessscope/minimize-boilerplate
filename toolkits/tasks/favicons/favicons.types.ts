import { TaskStrategy } from "@/toolkits/core/task/task.types";

export interface FaviconsStrategy extends TaskStrategy {}

export enum FaviconsNameStrategy {
  DEFAULT = "none",
}

export enum FaviconsNameExtension {
  ICO = "ico",
  PNG = "png",
  SVG = "svg",
  XML = "xml",
  WEBMANIFEST = "webmanifest",
}
