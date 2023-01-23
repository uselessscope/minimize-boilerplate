import { CommandBuilder } from "@/toolkits/core/command/command.builder";

import type { ConfigExtensions } from "@/toolkits/commands/config/config.types";

import type {
  Config,
  ConfigStrategies,
} from "@/toolkits/core/config/config.types";

export class ConfigBuilder extends CommandBuilder<Config> {
  private config: Config = {} as Config;

  src(src: string): this {
    this.config.src = src;
    return this;
  }

  dest(dest: string): this {
    this.config.dest = dest;
    return this;
  }

  paths(): this {
    this.config.paths = {
      views: {
        src: this.config.src + "/views",
        dest: this.config.dest + "/views",
      },

      styles: {
        src: this.config.src + "/styles",
        dest: this.config.dest + "/styles",
      },

      scripts: {
        src: this.config.src + "/scripts",
        dest: this.config.dest + "/scripts",
      },

      fonts: {
        src: this.config.src + "/fonts",
        dest: this.config.dest + "/fonts",
      },

      images: {
        src: this.config.src + "/images",
        dest: this.config.dest + "/images",
      },

      favicons: {
        src: this.config.src + "/favicons",
        dest: this.config.dest,
      },

      svg: {
        src: this.config.src + "/images/svg",
        dest: this.config.dest + "/images/svg",
      },
    };
    return this;
  }

  tasks(extension: ConfigExtensions): this {
    this.config.tasks = {
      views: {
        includes: [
          "{% paths.views.src %}" + "/**/*.{" + extension.views.join(",") + "}",
        ],
        outdir: "{% paths.views.dest %}",
      },

      styles: {
        infile: "{% paths.styles.src %}/index." + extension.styles,
        outfile: "{% paths.styles.dest %}/index.css",
      },

      scripts: {
        infile: "{% paths.scripts.src %}/app." + extension.scripts,
        outfile: "{% paths.scripts.dest %}/app.js",
      },

      fonts: {
        includes: [
          "{% paths.fonts.src %}" + "/**/*.{" + extension.fonts.join(",") + "}",
        ],
        outdir: "{% paths.fonts.dest %}",
      },

      images: {
        includes: [
          "{% paths.images.src %}" +
            "/**/*.{" +
            extension.images.join(",") +
            "}",
        ],
        excludes: ["{% paths.svg.src %}"],
        outdir: "{% paths.images.dest %}",
      },

      favicons: {
        includes: [
          "{% paths.favicons.src %}" +
            "/**/*.{" +
            extension.favicons.join(",") +
            "}",
        ],
        outdir: "{% paths.favicons.dest %}",
      },

      svg: {
        includes: [
          "{% paths.svg.src %}" + "/**/*.{" + extension.svg.join(",") + "}",
        ],
        outfile: "{% paths.svg.dest %}/sprite.svg",
      },
    };

    return this;
  }

  strategies(strategies: ConfigStrategies): this {
    this.config.strategies = strategies;
    return this;
  }

  output(): Config {
    return this.config;
  }
}
