export abstract class CommandExecutor<T> {
  protected abstract input(): T | Promise<T>;
  protected abstract build(input: T): void | Promise<void>;
  public abstract execute(): void | Promise<void>;
}
