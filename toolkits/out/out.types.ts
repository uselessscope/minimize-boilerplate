type Arguments = any[];

export interface Logger {
  log(...args: Arguments): void;
  success(...args: Arguments): void;
  warning(...args: Arguments): void;
  error(...args: Arguments): void;
}
