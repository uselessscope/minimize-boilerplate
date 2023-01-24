export interface TaskStrategy {
  precompile(): void;
  compile(): void;
}
