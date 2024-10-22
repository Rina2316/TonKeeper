import React, { createContext, useContext, useEffect, useState } from 'react';
import TonConnect, { Wallet } from '@tonconnect/sdk';
import { FRONT_URL } from '../../core/constants/front-url';
import { toast } from 'react-hot-toast';

interface WalletContextType {
  wallet: Wallet | null;
  balance: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  let tonConnect: TonConnect | null = null;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      tonConnect = new TonConnect({
        manifestUrl: `${FRONT_URL}/tonconnect-manifest.json`,
      });

      const unsubscribe = tonConnect.onStatusChange((walletInfo) => {
        setWallet(walletInfo);
      });

      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    if (wallet) {
      fetchBalance(wallet.account.address);
    } else {
      setBalance(null); 
    }
  }, [wallet]);

  const connectWallet = async () => {
    try {
      const res = await tonConnect?.connect({
        bridgeUrl: 'https://bridge.tonapi.io/bridge',
        universalLink: 'https://app.tonkeeper.com/ton-connect',
      });

      if (res) {
        window.location.href = res;
        toast.success('Wallet connected successfully!');
      }
    } catch (error) {
      const err = error as any;
      toast.error('Connection error: ' + err.message || 'Unknown error');
    }
  };

  const disconnectWallet = () => {
    tonConnect?.disconnect();
    setWallet(null);
    toast.success('Wallet disconnected successfully!');
  };

  const fetchBalance = async (address: string | undefined) => {
    if (!address) return;

    try {
      const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
      const data = await response.json();
      setBalance(data.result);
      toast.success('Balance fetched successfully!');
    } catch (error) {
      const err = error as any;
      toast.error('Balance receipt error: ' + err.message || 'Unknown error'); // Ошибка получения баланса
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, balance, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
