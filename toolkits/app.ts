import _ from "lodash";
import { ConfigExecutor } from "@/toolkits/commands/config/config.executor";
import { SourceExecutor } from "@/toolkits/commands/source/source.executor";
import { WatchExecutor } from "@/toolkits/commands/watch/watch.executor";
import { BuildExecutor } from "@/toolkits/commands/build/build.executor";
import { KleurLogger } from "@/toolkits/out/loggers/kleur.logger";

enum AppMode {
  INIT = "init",
  BUILD = "build",
  WATCH = "watch",
  SERVE = "serve",
}

export class App {
  defineMode() {
    const modes = _.values(AppMode);
    const argv = process.argv;

    for (const mode of modes) {
      if (argv.includes(mode)) {
        return mode;
      }
    }
  }

  async run() {
    const mode = this.defineMode();
    const logger = KleurLogger.get();

    switch (mode) {
      case AppMode.INIT:
        await new ConfigExecutor(logger).execute();
        await new SourceExecutor(logger).execute();
        break;

      case AppMode.BUILD:
        await new BuildExecutor(logger).execute();
        break;

      case AppMode.WATCH:
        await new WatchExecutor(logger).execute();
        break;

      case AppMode.SERVE:
        await new BuildExecutor(logger).execute();
        await new WatchExecutor(logger).execute();
        break;

      default:
        logger.error("Toolkits mode not specified");
    }
  }
}

const app = new App();
(async () => await app.run())();
