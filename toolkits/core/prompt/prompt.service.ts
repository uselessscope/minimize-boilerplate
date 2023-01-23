import { prompt } from "enquirer";
import {
  PromptInput,
  PromptSelect,
  PromptToggle,
} from "@/toolkits/core/prompt/prompt.types";

export class PromptService {
  public async input<T>(value: PromptInput): Promise<T> {
    return await prompt(value);
  }

  public async select<T>(promptSelect: PromptSelect): Promise<T> {
    return await prompt({ type: "select", ...promptSelect });
  }

  public async toggle<T>(promptSelect: PromptToggle): Promise<T> {
    return await prompt({ type: "toggle", ...promptSelect });
  }
}
