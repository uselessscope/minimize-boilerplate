import { promises } from "fs";
import type {
  IWriteFileData,
  IFileOptions,
} from "@/toolkits/utils/files/files.types";

export class FileService {
  private options: IFileOptions;

  constructor(
    options: IFileOptions = {
      read: { encoding: "UTF-8" },
      create: { recursive: true },
    }
  ) {
    this.options = options;
  }

  public async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public async readFile(path: string) {
    try {
      return await promises.readFile(path, this.options.read);
    } catch {
      return false;
    }
  }

  public async createFile(path: string, data: IWriteFileData = "") {
    try {
      await promises.writeFile(path, data, this.options.create);
      return true;
    } catch {
      return false;
    }
  }

  public async copyFile(src: string, dest: string) {
    try {
      await promises.copyFile(src, dest);
      return true;
    } catch {
      return false;
    }
  }

  public async unlinkFile(path: string) {
    try {
      await promises.unlink(path);
      return true;
    } catch {
      return false;
    }
  }
}
