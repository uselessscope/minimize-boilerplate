import { TaskStrategy } from "@/toolkits/core/task/task.types";

export interface FontsStrategy extends TaskStrategy {}

export enum FontsNameStrategy {
  DEFAULT = "none",
}

export enum FontsNameExtension {
  TTF = "ttf",
  OTF = "otf",
  WOFF = "woff",
  WOFF2 = "woff2",
  EOT = "eot",
}
