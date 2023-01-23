export abstract class CommandBuilder<T> {
  public abstract output(): T | Promise<T>;
}
