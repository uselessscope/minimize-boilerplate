import {
  ConfigParams,
  ConfigStrategies,
} from "@/toolkits/core/config/config.types";

export type ConfigExtensions = Record<ConfigParams, string[]>;

export interface ConfigInput {
  src: string;
  dest: string;
  extensions: ConfigExtensions;
  strategies: ConfigStrategies;
}
