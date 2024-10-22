
import React, { useEffect } from 'react';
import styles from './Headers.module.scss';
import { useWallet } from "../context/WalletContext"; 
import TonConnect from '@tonconnect/sdk';
import { FRONT_URL } from '../../core/constants/front-url';

interface HeaderProps {
  isWalletScreen: boolean;
  isTransactionScreen: boolean;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ isWalletScreen, onBack }) => {
  const { wallet, balance, connectWallet, disconnectWallet } = useWallet(); 

  useEffect(() => {
    let tonConnect: TonConnect | null = null;

    if (typeof window !== 'undefined') {
      tonConnect = new TonConnect({
        manifestUrl: `${FRONT_URL}/tonconnect-manifest.json`,
      });

      const unsubscribe = tonConnect.onStatusChange((walletInfo) => {
   });

      return () => unsubscribe();
    }
  }, []);

  return (
    <header className={styles.header}>
      <h1>Ton Wallet</h1>
      {wallet ? (
        <p className={styles.balance}>Balance: {balance} TON</p>
      ) : null}
      
      {isWalletScreen ? (
        wallet ? (
          <button onClick={disconnectWallet}>Disconnect TonKeeper</button>
        ) : (
          <button onClick={connectWallet}>Connect TonKeeper</button>
        )
      ) : (
        <button onClick={onBack}>Back</button>
      )}
    </header>
  );
};

export default Header;
