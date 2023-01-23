import { TaskStrategy } from "@/toolkits/core/task/task.types";

export interface BuildStrategy {
  name: string;
  value: TaskStrategy;
}
