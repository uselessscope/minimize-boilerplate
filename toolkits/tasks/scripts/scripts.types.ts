import { TaskStrategy } from "@/toolkits/core/task/task.types";

export interface ScriptsStrategy extends TaskStrategy {}

export enum ScriptsNameStrategy {
  ESBUILD = "esbuild",
}

export enum ScriptsNameExtension {
  JS = "js",
}
