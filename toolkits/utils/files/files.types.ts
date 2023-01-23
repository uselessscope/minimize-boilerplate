import { Stream } from "node:stream";

export interface IFileOptions {
  read: Record<string, any>;
  create: Record<string, any>;
}

export type IWriteFileData =
  | string
  | NodeJS.ArrayBufferView
  | Iterable<string | NodeJS.ArrayBufferView>
  | AsyncIterable<string | NodeJS.ArrayBufferView>
  | Stream;
