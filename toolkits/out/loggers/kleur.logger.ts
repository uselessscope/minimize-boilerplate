import kleur from "kleur";
import type { Logger } from "@/toolkits/out/out.types";

export class KleurLogger implements Logger {
  private static logger: Logger;

  public static get(): KleurLogger {
    return this.logger || new KleurLogger();
  }

  public log(...args: any) {
    console.log(kleur.white(args));
  }

  public success(...args: any) {
    console.log(kleur.green(args));
  }

  public error(...args: any) {
    console.log(kleur.red(args));
  }

  public warning(...args: any) {
    console.log(kleur.yellow(args));
  }
}
