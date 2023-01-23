export type PromptType = "input" | "invisible" | "list" | "password" | "text";

export interface PromptInput {
  type: PromptType;
  name: string;
  message: string;
  initial?: string;
}

export interface PromptSelect {
  name: string;
  message: string;
  choices: string[];
}

export interface PromptToggle {
  name: string;
  message: string;
  enabled: string;
  disabled: string;
}
