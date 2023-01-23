export interface TaskStrategy {
  precompile(): boolean;
  compile(): boolean;
}
