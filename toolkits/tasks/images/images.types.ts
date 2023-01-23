import { TaskStrategy } from "@/toolkits/core/task/task.types";

export interface ImagesStrategy extends TaskStrategy {}

export enum ImagesNameStrategy {
  DEFAULT = "none",
}

export enum ImagesNameExtension {
  PNG = "png",
  JPG = "jpg",
  GIF = "gif",
}
