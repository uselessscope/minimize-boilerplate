import { TaskStrategy } from "@/toolkits/core/task/task.strategy";
import { EsbuildStrategy } from "@/toolkits/tasks/scripts/strategies/esbuild.strategy";
import { ScriptsNameStrategy } from "@/toolkits/tasks/scripts/scripts.types";

export class ScriptsStrategy extends TaskStrategy {
  constructor(value: string) {
    let strategy;

    switch (value) {
      case ScriptsNameStrategy.ESBUILD:
        strategy = new EsbuildStrategy();
        break;
    }

    super(strategy);
  }
}
