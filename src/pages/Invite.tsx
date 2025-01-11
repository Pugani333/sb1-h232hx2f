import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Share2, Twitter } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import toast from 'react-hot-toast';

const Invite = () => {
  const { address } = useWallet();
  const [copied, setCopied] = useState(false);

  const referralLink = address
    ? `https://memequest.hub/invite/${address.toLowerCase()}`
    : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success('Referral link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy referral link');
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(
      '🚀 Join me on MemeQuest Hub and earn $MQT tokens! Use my referral link:'
    );
    const url = encodeURIComponent(referralLink);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank'
    );
  };

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Connect Your Wallet</h2>
          <p className="text-gray-300">
            Connect your wallet to get your unique referral link
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-white mb-2">Invite Friends</h2>
        <p className="text-gray-400">
          Share your referral link and earn rewards for each friend who joins
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/10"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-gray-400 mb-2">Your Referral Link</label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors"
              >
                <Copy className="w-5 h-5" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={shareOnTwitter}
              className="flex-1 flex items-center justify-center space-x-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Twitter className="w-5 h-5" />
              <span>Share on Twitter</span>
            </button>
            <button
              onClick={copyToClipboard}
              className="flex-1 flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Link</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-white/10"
      >
        <h3 className="text-xl font-bold text-white mb-6">Referral Rewards</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Successful Referrals</p>
              <p className="text-sm text-gray-400">Friends who joined using your link</p>
            </div>
            <p className="text-2xl font-bold text-white">0</p>
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
            <div>
              <p className="text-white font-medium">Total Rewards Earned</p>
              <p className="text-sm text-gray-400">From referral program</p>
            </div>
            <p className="text-2xl font-bold text-purple-400">0 $MQT</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Invite;