import { CommandExecutor } from "@/toolkits/core/command/command.executor";
import { ConfigService } from "@/toolkits/core/config/config.service";
import { FaviconsStrategy } from "@/toolkits/tasks/favicons/favicons.strategy";
import { FontsStrategy } from "@/toolkits/tasks/fonts/fonts.strategy";
import { ImagesStrategy } from "@/toolkits/tasks/images/images.strategy";
import { ScriptsStrategy } from "@/toolkits/tasks/scripts/scripts.strategy";
import { StylesStrategy } from "@/toolkits/tasks/styles/styles.strategy";
import { SvgStrategy } from "@/toolkits/tasks/svg/svg.strategy";
import { ViewsStrategy } from "@/toolkits/tasks/views/views.strategy";
import { ServerBuilder } from "@/toolkits/commands/watch/server.builder";
import type { Logger } from "@/toolkits/out/out.types";
import type { BrowserSyncInstance } from "browser-sync";

export class WatchExecutor extends CommandExecutor<void> {
  private server: BrowserSyncInstance;
  private configService = ConfigService.get();

  constructor(private logger: Logger) {
    super();

    const serverBuilder = new ServerBuilder(this.logger);

    this.server = serverBuilder
      .init({
        open: false,
        notify: false,
        server: {
          baseDir: this.configService.dest,
        },
      })
      .watchSource()
      .watchDist()
      .output();
  }

  protected async input(): Promise<void> {}

  protected async build(): Promise<void> {
    const { paths, strategies } = this.configService;

    const faviconsStrategy = new FaviconsStrategy(strategies.favicons);
    const fontsStrategy = new FontsStrategy(strategies.fonts);
    const imagesStrategy = new ImagesStrategy(strategies.images);
    const scriptsStrategy = new ScriptsStrategy(strategies.scripts);
    const stylesStrategy = new StylesStrategy(strategies.styles);
    const svgStrategy = new SvgStrategy(strategies.svg);
    const viewsStrategy = new ViewsStrategy(strategies.views);

    this.server
      .watch(paths.favicons.src, {
        ignoreInitial: true,
      })
      .on("change", () => {
        faviconsStrategy.compile();
      });

    this.server
      .watch(paths.fonts.src, {
        ignoreInitial: true,
      })
      .on("change", () => {
        fontsStrategy.compile();
      });

    this.server
      .watch(paths.images.src, {
        ignoreInitial: true,
      })
      .on("change", () => {
        imagesStrategy.compile();
      });

    this.server
      .watch(paths.scripts.src, {
        ignoreInitial: true,
      })
      .on("change", () => {
        scriptsStrategy.compile();
      });

    this.server
      .watch(paths.styles.src, {
        ignoreInitial: true,
      })
      .on("change", () => {
        stylesStrategy.compile();
      });

    this.server
      .watch(paths.svg.src, {
        ignoreInitial: true,
      })
      .on("change", () => {
        svgStrategy.compile();
      });

    this.server
      .watch(paths.views.src, {
        ignoreInitial: true,
      })
      .on("change", () => {
        viewsStrategy.compile();
      });
  }

  async execute(): Promise<void> {
    try {
      this.logger.log("Watch server started" + "\n");
      await this.build();
    } catch {
      this.logger.error("\n" + "Watch server failed" + "\n");
    }
  }
}
