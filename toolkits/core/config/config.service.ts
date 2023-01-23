import _ from "lodash";

import type {
  Config,
  ConfigPaths,
  ConfigTasks,
  ConfigStrategies,
  ConfigParams,
} from "@/toolkits/core/config/config.types";
import * as process from "process";

export class ConfigService implements Config {
  private static config: ConfigService;

  public src: string;
  public dest: string;
  public paths: ConfigPaths;
  public tasks: ConfigTasks;
  public strategies: ConfigStrategies;

  public static get(): ConfigService {
    return this.config || new ConfigService();
  }

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config = require(process.cwd() + "/minimize.json")

    const { src, dest, strategies, paths, tasks } = config as Config;

    this.src = src;
    this.dest = dest;
    this.paths = paths;
    this.tasks = this.resolveTasks(tasks);
    this.strategies = strategies;
  }

  private resolve(
    path: string,
    regexp: {
      wrapper: RegExp;
      value: RegExp;
    }
  ) {
    let value = path?.match(regexp.wrapper)?.pop()?.match(regexp.value)?.pop();

    value = value?.replaceAll(" ", "");
    value = value?.replace("paths.", "");

    return _.get(this.paths, value);
  }

  private resolveTasks(
    tasks: ConfigTasks,
    regexp: {
      wrapper: RegExp;
      value: RegExp;
    } = {
      wrapper: /{% .+ %}/,
      value: / .+ /,
    }
  ) {
    _.keys(tasks).forEach((task: ConfigParams) => {
      _.keys(tasks[task]).forEach((field: string) => {
        if (typeof tasks[task][field] === "string") {
          const value = this.resolve(tasks[task][field], regexp);

          if (value) {
            tasks[task][field] = tasks[task][field].replace(
              regexp.wrapper,
              value
            );
          }
        }

        if (typeof tasks[task][field] === "object") {
          _.isArray(tasks[task][field]) &&
            tasks[task][field].forEach((item: string, index: number) => {
              const value = this.resolve(tasks[task][field][index], regexp);

              if (value) {
                tasks[task][field][index] = tasks[task][field][index].replace(
                  regexp.wrapper,
                  value
                );
              }
            });
        }
      });
    });

    return tasks;
  }
}
