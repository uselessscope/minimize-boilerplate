import { TaskStrategy } from "@/toolkits/core/task/task.types";

export interface SvgStrategy extends TaskStrategy {}

export enum SvgNameStrategy {
  SVG_MIXER = "svg-mixer",
}

export enum SvgNameExtension {
  SVG = "svg",
}
