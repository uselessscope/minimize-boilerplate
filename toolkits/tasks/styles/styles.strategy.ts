import { TaskStrategy } from "@/toolkits/core/task/task.strategy";
import { StylesNameStrategy } from "@/toolkits/tasks/styles/styles.types";
import { CssStrategy } from "@/toolkits/tasks/styles/strategies/css.strategy";
import { SassStrategy } from "@/toolkits/tasks/styles/strategies/sass.strategy";
import { ScssStrategy } from "@/toolkits/tasks/styles/strategies/scss.strategy";

export class StylesStrategy extends TaskStrategy {
  constructor(value: string) {
    let strategy;

    switch (value) {
      case StylesNameStrategy.CSS:
        strategy = new CssStrategy();
        break;
      case StylesNameStrategy.SASS:
        strategy = new SassStrategy();
        break;
      case StylesNameStrategy.SCSS:
        strategy = new ScssStrategy();
        break;
    }

    super(strategy);
  }
}
