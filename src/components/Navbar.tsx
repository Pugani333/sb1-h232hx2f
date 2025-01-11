import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Trophy, Users, Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';

const Navbar = () => {
  const location = useLocation();
  const { address, connect, disconnect } = useWallet();

  const navItems = [
    { path: '/', icon: Rocket, label: 'Dashboard' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { path: '/invite', icon: Users, label: 'Invite Friends' },
  ];

  return (
    <nav className="bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Rocket className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              MemeQuest Hub
            </span>
          </Link>

          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="relative group"
              >
                <div className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"
                  />
                )}
              </Link>
            ))}

            <button
              onClick={address ? disconnect : connect}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            >
              <Wallet className="w-5 h-5" />
              <span>
                {address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;