import { CommandExecutor } from "@/toolkits/core/command/command.executor";
import { PromptService } from "@/toolkits/core/prompt/prompt.service";
import { ConfigBuilder } from "@/toolkits/commands/config/config.builder";
import { FileService } from "@/toolkits/utils/files/files.service";

import {
  ViewsNameExtension,
  ViewsNameStrategy,
} from "@/toolkits/tasks/views/views.types";

import {
  StylesNameExtension,
  StylesNameStrategy,
} from "@/toolkits/tasks/styles/styles.types";

import {
  ScriptsNameExtension,
  ScriptsNameStrategy,
} from "@/toolkits/tasks/scripts/scripts.types";

import {
  ImagesNameExtension,
  ImagesNameStrategy,
} from "@/toolkits/tasks/images/images.types";

import {
  FontsNameExtension,
  FontsNameStrategy,
} from "@/toolkits/tasks/fonts/fonts.types";

import {
  FaviconsNameExtension,
  FaviconsNameStrategy,
} from "@/toolkits/tasks/favicons/favicons.types";

import {
  SvgNameExtension,
  SvgNameStrategy,
} from "@/toolkits/tasks/svg/svg.types";

import type { Logger } from "@/toolkits/out/out.types";
import type { ConfigStrategies } from "@/toolkits/core/config/config.types";

import type {
  ConfigExtensions,
  ConfigInput,
} from "@/toolkits/commands/config/config.types";

export class ConfigExecutor extends CommandExecutor<ConfigInput> {
  private fileService = new FileService();
  private promptService = new PromptService();
  private configBuilder = new ConfigBuilder();

  constructor(private logger: Logger) {
    super();
  }

  protected async inputRootPaths(): Promise<{ src: string; dest: string }> {
    const { src } = await this.promptService.input<{ src: string }>({
      type: "input",
      name: "src",
      message: "Input source directory",
      initial: "./src",
    });

    const { dest } = await this.promptService.input<{ dest: string }>({
      type: "input",
      name: "dest",
      message: "Input dest directory",
      initial: "./dist",
    });

    return { src, dest };
  }

  protected async inputStrategies(): Promise<ConfigStrategies> {
    const { views } = await this.promptService.select<{
      views: ViewsNameStrategy;
    }>({
      name: "views",
      message: "Select views builder",
      choices: Object.values(ViewsNameStrategy),
    });

    const { styles } = await this.promptService.select<{
      styles: StylesNameStrategy;
    }>({
      name: "styles",
      message: "Select styles builder",
      choices: Object.values(StylesNameStrategy),
    });

    const { scripts } = await this.promptService.select<{
      scripts: ScriptsNameStrategy;
    }>({
      name: "scripts",
      message: "Select scripts builder",
      choices: Object.values(ScriptsNameStrategy),
    });

    const { svg } = await this.promptService.select<{
      svg: SvgNameStrategy;
    }>({
      name: "svg",
      message: "Select svg builder",
      choices: Object.values(SvgNameStrategy),
    });

    const images = ImagesNameStrategy.DEFAULT;
    const fonts = FontsNameStrategy.DEFAULT;
    const favicons = FaviconsNameStrategy.DEFAULT;

    return {
      views,
      styles,
      scripts,
      fonts,
      favicons,
      images,
      svg,
    };
  }

  protected defineExtensions(strategies: ConfigStrategies): ConfigExtensions {
    let views, styles, scripts, svg, fonts, favicons, images;

    switch (strategies.views) {
      case ViewsNameStrategy.HTML:
        views = [ViewsNameExtension.HTML];
        break;
      case ViewsNameStrategy.PUG:
        views = [ViewsNameExtension.PUG];
        break;
      default:
        views = Object.values(ViewsNameExtension);
    }

    switch (strategies.styles) {
      case StylesNameStrategy.CSS:
        styles = [StylesNameExtension.CSS];
        break;
      case StylesNameStrategy.SASS:
        styles = [StylesNameExtension.SASS];
        break;
      case StylesNameStrategy.SCSS:
        styles = [StylesNameExtension.SCSS];
        break;
      default:
        styles = Object.values(StylesNameExtension);
    }

    switch (strategies.scripts) {
      case ScriptsNameStrategy.ESBUILD:
        scripts = [ScriptsNameExtension.JS];
        break;
      default:
        scripts = Object.values(ScriptsNameExtension);
    }

    switch (strategies.fonts) {
      default:
        fonts = Object.values(FontsNameExtension);
    }

    switch (strategies.favicons) {
      default:
        favicons = Object.values(FaviconsNameExtension);
    }

    switch (strategies.images) {
      default:
        images = Object.values(ImagesNameExtension);
    }

    switch (strategies.svg) {
      default:
        svg = Object.values(SvgNameExtension);
    }

    return {
      views,
      styles,
      scripts,
      fonts,
      favicons,
      images,
      svg,
    };
  }

  protected async input(): Promise<ConfigInput> {
    this.logger.success("\n" + "Minimize config setup" + "\n");

    const { src, dest } = await this.inputRootPaths();

    this.logger.log("\n" + "Selected a project technology" + "\n");

    const strategies = await this.inputStrategies();
    const extensions = this.defineExtensions(strategies);

    return {
      src,
      dest,
      extensions,
      strategies,
    };
  }

  protected async build(input: ConfigInput): Promise<void> {
    const { src, dest, strategies, extensions } = input;

    const config = this.configBuilder
      .src(src)
      .dest(dest)
      .paths()
      .tasks(extensions)
      .strategies(strategies)
      .output();

    const result = await this.fileService.createFile(
      process.cwd() + "/" + "minimize.json",
      JSON.stringify(config, null, 2)
    );

    if (result) {
      this.logger.success("\n" + "Config successfully created");
    } else {
      this.logger.error(
        "\n" + "Creation of the configuration file received an error"
      );
    }
  }

  public async execute(): Promise<void> {
    try {
      const input = await this.input();
      await this.build(input);
    } catch {
      this.logger.error("\n" + "Config setup failed");
    }
  }
}
