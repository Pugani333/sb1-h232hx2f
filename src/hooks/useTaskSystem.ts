import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Task } from '../types';
import toast from 'react-hot-toast';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Follow MemeQuest on Twitter',
    description: 'Follow our official Twitter account to earn $MQT tokens',
    type: 'social',
    reward: 1000,
    completed: false,
    requirements: {
      platform: 'twitter',
      action: 'follow'
    }
  },
  {
    id: '2',
    title: 'Join Telegram Community',
    description: 'Join our Telegram group to stay updated and earn rewards',
    type: 'social',
    reward: 1000,
    completed: false,
    requirements: {
      platform: 'telegram',
      action: 'join'
    }
  },
  {
    id: '3',
    title: 'Hold $MQT Tokens',
    description: 'Hold at least 10,000 $MQT tokens in your wallet',
    type: 'web3',
    reward: 5000,
    completed: false,
    requirements: {
      tokenAmount: 10000
    }
  }
];

export const useTaskSystem = () => {
  const queryClient = useQueryClient();

  const { data: tasks = [], isLoading } = useQuery<Task[]>(
    'tasks',
    () => Promise.resolve(MOCK_TASKS),
    {
      staleTime: 60000,
    }
  );

  const completeTask = useMutation(
    async (taskId: string) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return taskId;
    },
    {
      onSuccess: (taskId) => {
        queryClient.setQueryData<Task[]>('tasks', (oldTasks = []) =>
          oldTasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task
          )
        );
        toast.success('Task completed successfully!');
      },
      onError: () => {
        toast.error('Failed to complete task. Please try again.');
      }
    }
  );

  return {
    tasks,
    isLoading,
    completeTask: completeTask.mutate,
    isCompleting: completeTask.isLoading
  };
};