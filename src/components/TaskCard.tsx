import React from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types';
import { Twitter, MessageCircle, Wallet, CheckCircle, Loader2 } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
  isCompleting: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete, isCompleting }) => {
  const getTaskIcon = () => {
    switch (task.type) {
      case 'social':
        return task.requirements?.platform === 'twitter' ? Twitter : MessageCircle;
      case 'web3':
        return Wallet;
      default:
        return CheckCircle;
    }
  };

  const Icon = getTaskIcon();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/5 backdrop-blur-lg rounded-lg p-6 border ${
        task.completed ? 'border-green-500/50' : 'border-white/10'
      } hover:border-purple-500/50 transition-colors`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className={`p-2 rounded-lg ${
            task.completed ? 'bg-green-500/20' : 'bg-purple-500/20'
          }`}>
            <Icon className={`w-6 h-6 ${
              task.completed ? 'text-green-400' : 'text-purple-400'
            }`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">{task.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{task.description}</p>
            <div className="flex items-center space-x-2">
              <span className="text-purple-400 font-medium">{task.reward} $MQT</span>
              {task.completed && (
                <span className="text-green-400 text-sm">(Completed)</span>
              )}
            </div>
          </div>
        </div>
        
        <button
          onClick={() => !task.completed && onComplete(task.id)}
          disabled={task.completed || isCompleting}
          className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
            task.completed
              ? 'bg-green-500/20 text-green-400 cursor-not-allowed'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          } transition-colors`}
        >
          {isCompleting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : task.completed ? (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Completed</span>
            </>
          ) : (
            <span>Complete Task</span>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;