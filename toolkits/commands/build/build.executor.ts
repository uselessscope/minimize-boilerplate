import { CommandExecutor } from "@/toolkits/core/command/command.executor";
import { ConfigService } from "@/toolkits/core/config/config.service";
import { FaviconsStrategy } from "@/toolkits/tasks/favicons/favicons.strategy";
import { FontsStrategy } from "@/toolkits/tasks/fonts/fonts.strategy";
import { ImagesStrategy } from "@/toolkits/tasks/images/images.strategy";
import { ScriptsStrategy } from "@/toolkits/tasks/scripts/scripts.strategy";
import { StylesStrategy } from "@/toolkits/tasks/styles/styles.strategy";
import { SvgStrategy } from "@/toolkits/tasks/svg/svg.strategy";
import { ViewsStrategy } from "@/toolkits/tasks/views/views.strategy";
import { TaskStrategy } from "@/toolkits/core/task/task.strategy";
import type { Logger } from "@/toolkits/out/out.types";

export class BuildExecutor extends CommandExecutor<void> {
  private configService = ConfigService.get();

  constructor(private logger: Logger) {
    super();
  }

  protected async input(): Promise<any> {}

  protected async build(): Promise<void> {
    const { strategies } = this.configService;

    const strategiesScope: TaskStrategy[] = [
      new FaviconsStrategy(strategies.favicons),
      new FontsStrategy(strategies.fonts),
      new ImagesStrategy(strategies.images),
      new ScriptsStrategy(strategies.scripts),
      new StylesStrategy(strategies.styles),
      new SvgStrategy(strategies.svg),
      new ViewsStrategy(strategies.views),
    ];

    strategiesScope.forEach((strategy: TaskStrategy) => {
      strategy.precompile();
      strategy.compile();
    });

    this.logger.success("Build success");
  }

  async execute(): Promise<void> {
    try {
      await this.build();
    } catch {
      this.logger.error("\n" + "Build failed" + "\n");
    }
  }
}
