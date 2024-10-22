// src/app/wallet/page.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './WalletPage.module.scss';
import { useWallet } from '../../context/WalletContext';
import Image from 'next/image';
import background_img from "../../../public/background_img.png";
import { toast } from 'react-hot-toast';

const WalletPage = () => {
  const router = useRouter(); 
  const { wallet } = useWallet(); 

  const handleNavigateToTransactions = () => {
    router.push('/transaction');
  };

  const copyAddressToClipboard = () => {
    if (wallet && wallet.account?.address) {
      navigator.clipboard.writeText(wallet.account.address)
        .then(() => {
          toast.success('The address has been copied to the clipboard!');
        })
        .catch((error) => {
          toast.error('Error copying the address: ' + (error as any).message || 'Unknown error');
        });
    }
  };

  return (
    <div className={styles.walletPage}>
      <div className={styles.background}>
        <Image
          src={background_img}
          alt="background"
          fill
          priority
          sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.background_img}
        />
      </div>
      
      <div className={styles.wallet}>
        <h1>Wallet Address</h1>
        {wallet ? (
          <p className={styles.address} onClick={copyAddressToClipboard}>
            {wallet.account?.address}
          </p>
        ) : (
          <p>Here will be link after connection</p>
        )}
        <button onClick={handleNavigateToTransactions}>Go to Transactions</button>
      </div>
    </div>
  );
};

export default WalletPage;
