import { promises } from "fs";
import { join, basename } from "path";
import type { IDirectoryOptions } from "@/toolkits/utils/directories/directories.types";

export class DirectoriesService {
  private options: IDirectoryOptions;

  constructor(
    options: IDirectoryOptions = {
      read: {},
      copy: {},
      create: { recursive: true },
      unlink: { recursive: true },
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

  public async isDirectory(path: string) {
    try {
      const lstat = await promises.lstat(path);
      return lstat.isDirectory();
    } catch {
      return false;
    }
  }

  public async readDirectory(path: string) {
    try {
      return await promises.readdir(path, this.options.read);
    } catch {
      return false;
    }
  }

  public async createDirectory(path: string) {
    try {
      await promises.mkdir(path, this.options.create);
      return true;
    } catch {
      return false;
    }
  }

  private async copyDirectoryRecursive(
    src: string,
    dest: string,
    callback: (src: string, dest: string) => Promise<void>
  ) {
    const destPath = join(src, basename(dest));
    await this.createDirectory(destPath);

    const readResult = await this.readDirectory(dest);

    if (readResult && readResult.length) {
      for (const item of readResult) {
        const srcPath = join(dest, item);
        await callback(srcPath, destPath);
      }
    }
  }

  public async copyDirectoryRecursiveWithoutFiles(src: string, dest: string) {
    const srcIsDirectory = await this.isDirectory(src);

    if (srcIsDirectory) {
      await this.copyDirectoryRecursive(
        src,
        dest,
        this.copyDirectoryRecursiveWithoutFiles
      );
    }
  }

  public async copyDirectoryRecursiveWithFiles(src: string, dest: string) {
    const srcIsDirectory = await this.isDirectory(src);

    if (srcIsDirectory) {
      await this.copyDirectoryRecursive(
        src,
        dest,
        this.copyDirectoryRecursiveWithFiles
      );
    } else {
      await promises.copyFile(src, dest);
    }
  }

  public async unlinkDirectory(path: string) {
    try {
      await promises.rm(path, this.options.unlink);
      return true;
    } catch {
      return false;
    }
  }
}
