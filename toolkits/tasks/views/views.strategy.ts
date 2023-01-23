import { TaskStrategy } from "@/toolkits/core/task/task.strategy";
import { ViewsNameStrategy } from "@/toolkits/tasks/views/views.types";
import { HtmlStrategy } from "@/toolkits/tasks/views/strategies/html.strategy";
import { PugStrategy } from "@/toolkits/tasks/views/strategies/pug.strategy";

export class ViewsStrategy extends TaskStrategy {
  constructor(value: string) {
    let strategy;

    switch (value) {
      case ViewsNameStrategy.HTML:
        strategy = new HtmlStrategy();
        break;
      case ViewsNameStrategy.PUG:
        strategy = new PugStrategy();
        break;
    }

    super(strategy);
  }
}
