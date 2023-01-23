import { FaviconsStrategy } from "@/toolkits/tasks/favicons/favicons.types";

export class DefaultFaviconsStrategy implements FaviconsStrategy {
  precompile(): boolean {
    return true;
  }

  compile(): boolean {
    return true;
  }
}
