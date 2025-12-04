import { Task } from './types';

export const MOCK_TASKS: Task[] = [
  { id: '1', title: '早睡早起', icon: '🌙', status: 'pending', description: '23:00前入睡' },
  { id: '2', title: '每日8杯水', icon: '💧', status: 'pending', description: '每次200ml' },
  { id: '3', title: '按时吃饭', icon: '🍱', status: 'completed', description: '三餐规律' },
  { id: '4', title: '运动25分钟', icon: '🏃', status: 'pending', description: '有氧运动' },
  { id: '5', title: '吃水果', icon: '🍎', status: 'pending', description: '补充维生素' },
];

export const MOCK_USER = {
  id: 'u1',
  name: 'Alex',
  avatar: 'https://picsum.photos/200/200?random=1',
  streakDays: 42,
  partnerId: 'u2'
};

export const MOCK_PARTNER = {
  id: 'u2',
  name: 'Sam',
  avatar: 'https://picsum.photos/200/200?random=2',
};

// Neo-Brutalism Palette
export const NEO_COLORS = {
  yellow: 'bg-[#FFDE00]',
  pink: 'bg-[#FF00FF]',
  cyan: 'bg-[#00FFFF]',
  green: 'bg-[#CCFF00]',
  white: 'bg-white',
};
