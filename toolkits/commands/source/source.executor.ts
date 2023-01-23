import { CommandExecutor } from "@/toolkits/core/command/command.executor";
import { ConfigService } from "@/toolkits/core/config/config.service";
import { PromptService } from "@/toolkits/core/prompt/prompt.service";
import { DirectoriesService } from "@/toolkits/utils/directories/directories.service";
import { FileService } from "@/toolkits/utils/files/files.service";

import type { Logger } from "@/toolkits/out/out.types";
import type { SourceToggle } from "@/toolkits/commands/source/source.types";

import type {
  ConfigPaths,
  ConfigTasks,
} from "@/toolkits/core/config/config.types";

export class SourceExecutor extends CommandExecutor<SourceToggle> {
  private configService = ConfigService.get();
  private promptService = new PromptService();
  private directoriesService = new DirectoriesService();
  private fileService = new FileService();

  constructor(private logger: Logger) {
    super();
  }

  protected async createSourceDirectory(src: string): Promise<boolean> {
    await this.directoriesService.unlinkDirectory(src);
    return await this.directoriesService.createDirectory(src);
  }

  protected async createPathsDirectories(paths: ConfigPaths) {
    const accumulator: boolean[] = [];

    for (const key in paths) {
      const path = paths[key].src;
      const result = await this.directoriesService.createDirectory(path);

      accumulator.push(result);
    }

    return !accumulator.some((item: boolean) => !item);
  }

  protected async createTasksFiles(tasks: ConfigTasks) {
    const accumulator: boolean[] = [];

    for (const key in tasks) {
      if ("infile" in tasks[key]) {
        const path = tasks[key].infile;
        const result = await this.fileService.createFile(path);

        accumulator.push(result);
      }
    }

    return !accumulator.some((item: boolean) => !item);
  }

  protected async input(): Promise<SourceToggle> {
    this.logger.log("\n" + "Project source setup" + "\n");

    const { toggle } = await this.promptService.toggle<{
      toggle: boolean;
    }>({
      name: "toggle",
      message: "Create source directory",
      enabled: "Yes",
      disabled: "No",
    });

    return toggle;
  }

  protected async build(toggle: SourceToggle): Promise<void> {
    if (toggle) {
      const { src, paths, tasks } = this.configService;

      const createSourceDirectoryResult = await this.createSourceDirectory(src);

      if (createSourceDirectoryResult) {
        this.logger.log("\n" + "Source directory created");
      } else {
        this.logger.error("\n" + "Source directory creation failed");
        throw new Error();
      }

      const createPathsDirectoriesResult = await this.createPathsDirectories(
        paths
      );

      if (createPathsDirectoriesResult) {
        this.logger.log("Paths directories created");
      } else {
        this.logger.error("Paths directories creation failed");
        throw new Error();
      }

      const createTasksFilesResult = await this.createTasksFiles(tasks);

      if (createTasksFilesResult) {
        this.logger.log("Tasks files created");
      } else {
        this.logger.error("Tasks files creation failed");
        throw new Error();
      }

      this.logger.success("\n" + "Project source setup successfully");
    }
  }

  async execute(): Promise<void> {
    try {
      const input = await this.input();
      await this.build(input);
    } catch {
      this.logger.error("\n" + "Project source setup failed");
    }
  }
}
