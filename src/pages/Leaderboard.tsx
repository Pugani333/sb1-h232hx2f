import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { address: '0x1234...5678', tasksCompleted: 10, referralCount: 5, totalRewards: 15000, rank: 1 },
  { address: '0x8765...4321', tasksCompleted: 8, referralCount: 3, totalRewards: 12000, rank: 2 },
  { address: '0x9876...1234', tasksCompleted: 6, referralCount: 2, totalRewards: 9000, rank: 3 },
];

const Leaderboard = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Leaderboard</h2>
        <p className="text-gray-400">Top performers in the MemeQuest community</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {MOCK_LEADERBOARD.slice(0, 3).map((user, index) => {
          const Icon = index === 0 ? Trophy : index === 1 ? Medal : Award;
          const colors = [
            'from-yellow-500 to-yellow-600',
            'from-gray-400 to-gray-500',
            'from-amber-600 to-amber-700'
          ];
          
          return (
            <motion.div
              key={user.address}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="flex flex-col items-center">
                <div className={`p-4 rounded-full bg-gradient-to-r ${colors[index]} mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <p className="text-xl font-bold text-white mb-1">Rank #{user.rank}</p>
                <p className="text-gray-400 mb-4">{user.address}</p>
                <div className="w-full space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tasks</span>
                    <span className="text-white">{user.tasksCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Referrals</span>
                    <span className="text-white">{user.referralCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rewards</span>
                    <span className="text-purple-400">{user.totalRewards.toLocaleString()} $MQT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-lg border border-white/10"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-4 text-left text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-gray-400">Address</th>
                <th className="px-6 py-4 text-left text-gray-400">Tasks</th>
                <th className="px-6 py-4 text-left text-gray-400">Referrals</th>
                <th className="px-6 py-4 text-left text-gray-400">Rewards</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((user) => (
                <tr
                  key={user.address}
                  className="border-b border-white/10 hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-white font-medium">#{user.rank}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{user.address}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{user.tasksCompleted}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{user.referralCount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-purple-400">{user.totalRewards.toLocaleString()} $MQT</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;