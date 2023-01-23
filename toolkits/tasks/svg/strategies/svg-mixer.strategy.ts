import { SvgStrategy } from "@/toolkits/tasks/svg/svg.types";

export class SvgMixerStrategy implements SvgStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
