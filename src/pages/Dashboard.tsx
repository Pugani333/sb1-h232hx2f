import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useTaskSystem } from '../hooks/useTaskSystem';
import TaskCard from '../components/TaskCard';

const Dashboard = () => {
  const { address } = useWallet();
  const { tasks, isLoading, completeTask, isCompleting } = useTaskSystem();

  const stats = [
    { 
      icon: Trophy, 
      label: 'Tasks Completed', 
      value: `${tasks.filter(t => t.completed).length}/${tasks.length}` 
    },
    { icon: Users, label: 'Referrals', value: '0' },
    { 
      icon: Wallet, 
      label: 'Claimable $MQT', 
      value: tasks
        .filter(t => t.completed)
        .reduce((acc, t) => acc + t.reward, 0)
        .toLocaleString() 
    },
  ];

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Welcome to MemeQuest Hub</h2>
          <p className="text-gray-300 mb-8">Connect your wallet to start earning $MQT tokens</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <stat.icon className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6">Available Tasks</h3>
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              </div>
            ) : tasks.length > 0 ? (
              tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={completeTask}
                  isCompleting={isCompleting}
                />
              ))
            ) : (
              <p className="text-gray-400">No tasks available yet</p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-6">Reward History</h3>
          <div className="space-y-4">
            {tasks.filter(t => t.completed).length > 0 ? (
              <div className="space-y-4">
                {tasks
                  .filter(t => t.completed)
                  .map(task => (
                    <div
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div>
                        <p className="text-white font-medium">{task.title}</p>
                        <p className="text-sm text-gray-400">Task Completed</p>
                      </div>
                      <p className="text-purple-400 font-medium">+{task.reward} $MQT</p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No rewards claimed yet</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;