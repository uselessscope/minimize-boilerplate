import { TaskStrategy } from "@/toolkits/core/task/task.strategy";
import { SvgNameStrategy } from "@/toolkits/tasks/svg/svg.types";
import { SvgMixerStrategy } from "@/toolkits/tasks/svg/strategies/svg-mixer.strategy";

export class SvgStrategy extends TaskStrategy {
  constructor(value: string) {
    let strategy;

    switch (value) {
      case SvgNameStrategy.SVG_MIXER:
        strategy = new SvgMixerStrategy();
        break;
    }

    super(strategy);
  }
}
