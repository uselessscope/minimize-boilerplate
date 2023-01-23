import { Logger } from "@/toolkits/out/out.types";

export class ConsoleLogger implements Logger {
  private static logger: Logger;

  public static get(): ConsoleLogger {
    return this.logger || new ConsoleLogger();
  }

  public log(...args: any) {
    console.log(...args);
  }

  public success(...args: any) {
    console.log(...args);
  }

  public error(...args: any) {
    console.log(...args);
  }

  public warning(...args: any) {
    console.log(...args);
  }
}
