import browserSync from "browser-sync";
import { CommandBuilder } from "@/toolkits/core/command/command.builder";
import { ConfigService } from "@/toolkits/core/config/config.service";
import { FileService } from "@/toolkits/utils/files/files.service";
import { DirectoriesService } from "@/toolkits/utils/directories/directories.service";
import type { BrowserSyncInstance, Options } from "browser-sync";
import type { Logger } from "@/toolkits/out/out.types";

export class ServerBuilder extends CommandBuilder<BrowserSyncInstance> {
  private configService = ConfigService.get();
  private directoriesService = new DirectoriesService();
  private fileService = new FileService();

  private server: BrowserSyncInstance = browserSync.create();

  constructor(private logger: Logger) {
    super();
  }

  init(config: Options) {
    this.server.init(config, (error: Error) => {
      if (error) {
        this.logger.error("Error starting development server");
        this.logger.error(error);
      }
    });

    return this;
  }

  watchSource() {
    this.server
      .watch(this.configService.src, {
        ignoreInitial: true,
      })
      .on("unlink", async (source) => {
        const path = ("./" + source).replace(
          this.configService.src,
          this.configService.dest
        );

        await this.fileService.unlinkFile(path);
      })
      .on("addDir", async (source) => {
        const path = ("./" + source).replace(
          this.configService.src,
          this.configService.dest
        );

        await this.directoriesService.createDirectory(path);
      })
      .on("unlinkDir", async (source) => {
        const path = ("./" + source).replace(
          this.configService.src,
          this.configService.dest
        );

        await this.directoriesService.unlinkDirectory(path);
      });

    return this;
  }

  watchDist() {
    this.server.watch(this.configService.dest).on("all", this.server.reload);

    return this;
  }

  output(): BrowserSyncInstance {
    return this.server;
  }
}
