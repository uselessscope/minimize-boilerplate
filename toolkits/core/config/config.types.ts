import { ViewsNameStrategy } from "@/toolkits/tasks/views/views.types";
import { StylesNameStrategy } from "@/toolkits/tasks/styles/styles.types";
import { ScriptsNameStrategy } from "@/toolkits/tasks/scripts/scripts.types";
import { FontsNameStrategy } from "@/toolkits/tasks/fonts/fonts.types";
import { FaviconsNameStrategy } from "@/toolkits/tasks/favicons/favicons.types";
import { ImagesNameStrategy } from "@/toolkits/tasks/images/images.types";
import { SvgNameStrategy } from "@/toolkits/tasks/svg/svg.types";

export enum ConfigParams {
  VIEWS = "views",
  STYLES = "styles",
  SCRIPTS = "scripts",
  FONTS = "fonts",
  IMAGES = "images",
  FAVICONS = "favicons",
  SVG = "svg",
}

export type ConfigPaths = Record<
  ConfigParams,
  {
    src: string;
    dest: string;
  }
>;

export type ConfigTasks = Record<
  ConfigParams,
  {
    infile?: string;
    outdir?: string;
    includes?: string[];
    excludes?: string[];
    outfile?: string;
  }
>;

export interface ConfigStrategies {
  views: ViewsNameStrategy;
  styles: StylesNameStrategy;
  scripts: ScriptsNameStrategy;
  fonts: FontsNameStrategy;
  favicons: FaviconsNameStrategy;
  images: ImagesNameStrategy;
  svg: SvgNameStrategy;
}

export interface Config {
  src: string;
  dest: string;
  strategies: ConfigStrategies;
  paths: ConfigPaths;
  tasks: ConfigTasks;
}
