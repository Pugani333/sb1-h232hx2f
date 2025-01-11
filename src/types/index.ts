export interface Task {
  id: string;
  title: string;
  description: string;
  type: 'social' | 'referral' | 'web3';
  reward: number;
  completed: boolean;
  requirements?: {
    platform?: string;
    action?: string;
    tokenAmount?: number;
  };
}

export interface User {
  address: string;
  tasksCompleted: number;
  referralCount: number;
  totalRewards: number;
  claimableRewards: number;
  referralCode: string;
}

export interface LeaderboardEntry {
  address: string;
  tasksCompleted: number;
  referralCount: number;
  totalRewards: number;
  rank: number;
}