import { TaskStrategy } from "@/toolkits/core/task/task.strategy";
import { ImagesNameStrategy } from "@/toolkits/tasks/images/images.types";
import { DefaultImagesStrategy } from "@/toolkits/tasks/images/strategies/default-images.strategy";

export class ImagesStrategy extends TaskStrategy {
  constructor(value: string) {
    let strategy;

    switch (value) {
      case ImagesNameStrategy.DEFAULT:
        strategy = new DefaultImagesStrategy();
        break;
    }

    super(strategy);
  }
}
