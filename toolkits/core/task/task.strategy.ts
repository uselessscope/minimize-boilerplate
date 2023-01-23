import { TaskStrategy as Strategy } from "@/toolkits/core/task/task.types";

export class TaskStrategy implements Strategy {
  constructor(private strategy: Strategy) {}

  precompile() {
    return this.strategy.precompile();
  }

  compile() {
    return this.strategy.compile();
  }
}
