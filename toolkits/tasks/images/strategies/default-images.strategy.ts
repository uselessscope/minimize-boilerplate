import { ImagesStrategy } from "@/toolkits/tasks/images/images.types";

export class DefaultImagesStrategy implements ImagesStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
