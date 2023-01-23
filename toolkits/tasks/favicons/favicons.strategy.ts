import { TaskStrategy } from "@/toolkits/core/task/task.strategy";
import { FaviconsNameStrategy } from "@/toolkits/tasks/favicons/favicons.types";
import { DefaultFaviconsStrategy } from "@/toolkits/tasks/favicons/strategies/default-favicons.strategy";

export class FaviconsStrategy extends TaskStrategy {
  constructor(value: string) {
    let strategy;

    switch (value) {
      case FaviconsNameStrategy.DEFAULT:
        strategy = new DefaultFaviconsStrategy();
        break;
    }

    super(strategy);
  }
}
