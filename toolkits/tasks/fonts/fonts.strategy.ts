import { TaskStrategy } from "@/toolkits/core/task/task.strategy";
import { FontsNameStrategy } from "@/toolkits/tasks/fonts/fonts.types";
import { DefaultFontsStrategy } from "@/toolkits/tasks/fonts/strategies/default-fonts.strategy";

export class FontsStrategy extends TaskStrategy {
  constructor(value: string) {
    let strategy;

    switch (value) {
      case FontsNameStrategy.DEFAULT:
        strategy = new DefaultFontsStrategy();
        break;
    }

    super(strategy);
  }
}
