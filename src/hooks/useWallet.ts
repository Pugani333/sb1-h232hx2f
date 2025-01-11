import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('Please install MetaMask to connect your wallet');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const network = await provider.getNetwork();
      
      // Check if we're on BSC
      if (network.chainId !== 56n) {
        toast.error('Please switch to Binance Smart Chain');
        return;
      }

      const accounts = await provider.send('eth_requestAccounts', []);
      setAddress(accounts[0]);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    toast.success('Wallet disconnected');
  }, []);

  return { address, connect, disconnect };
};