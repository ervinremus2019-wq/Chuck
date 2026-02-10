
export interface ChatMessage {
  text: string;
  type: 'user' | 'ai';
  isPremium?: boolean;
}

export interface VaultItem {
  id: string;
  name: string;
  tag: string;
  tagColor?: string;
  borderColor?: string;
}

export type TabId = 'dash' | 'vault' | 'legal' | 'settings';
