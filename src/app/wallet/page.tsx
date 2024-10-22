"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import styles from './WalletPage.module.scss';
import TonConnect, { Wallet } from "@tonconnect/sdk";
import Image from 'next/image';
import background_img from "../../../public/background_img.png";

const WalletPage = () => {
  const router = useRouter(); 
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const handleNavigateToTransactions = () => {
    router.push('/transaction');
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
          <p> {wallet.account?.address}</p>
        ) : (
          <p> Here will be link after connection </p>
        )}
        <button onClick={handleNavigateToTransactions}>Go to Transactions</button>
      </div>
    </div>
  );
};

export default WalletPage;
