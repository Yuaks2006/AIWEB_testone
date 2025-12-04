export type ViewState = 
  | 'LOGIN' 
  | 'HOME' 
  | 'RELATIONSHIP' 
  | 'TASKS' 
  | 'AI_ASSISTANT' 
  | 'CERTIFICATE' 
  | 'SETTINGS';

export type SubViewState = 'REPORT' | 'FOOD_ID' | 'CHAT';

export interface User {
  id: string;
  name: string;
  avatar: string;
  partnerId?: string;
  streakDays: number;
}

export interface Task {
  id: string;
  title: string;
  icon: string;
  status: 'pending' | 'completed';
  description?: string;
  type?: 'manual' | 'photo';
}

export interface FoodAnalysisResult {
  food: string;
  calorie: string;
  nutrition: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

// Color variants for the Brutalist theme
export type NeoColor = 'yellow' | 'pink' | 'cyan' | 'green' | 'white';
