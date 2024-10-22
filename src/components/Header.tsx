import React from 'react';
import styles from './Headers.module.scss';
import { useEffect, useState } from "react";
import TonConnect, { Wallet } from "@tonconnect/sdk";
import { FRONT_URL } from "../../core/constants/front-url";


interface HeaderProps {
  isWalletScreen: boolean;
  isTransactionScreen: boolean;
  onBack: () => void;
}

const Header: React.FC<HeaderProps> = ({  isWalletScreen, isTransactionScreen, onBack }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
	let tonConnect: TonConnect | null = null
	const [balance, setBalance] = useState<string>()


  useEffect(() => {
		if (typeof window !== 'undefined') {
			tonConnect = new TonConnect({
				manifestUrl: `${FRONT_URL}/tonconnect-manifest.json`,
			});
			console.log(tonConnect);


			// Следите за изменениями статуса кошелька
			const unsubscribe = tonConnect.onStatusChange((walletInfo) => {
				setWallet(walletInfo);
				console.log('here');

			});

			return () => unsubscribe();
		}
	}, []);

  useEffect(() => {
		if (wallet) {
			fetchBalance(wallet.account.address)
		}

	}, [wallet])

  const connectWallet = async () => {
		try {
			const res = await tonConnect?.connect({
				bridgeUrl: 'https://bridge.tonapi.io/bridge',  // Мост для работы с кошельком
				universalLink: 'https://app.tonkeeper.com/ton-connect' // Ссылка на TonKeeper
			});

			if (res) {
				window.location.href = res;
			}
			console.log('connected: ', res);

		} catch (error) {
			console.error('Ошибка подключения:', error);
		}
	};

	const disconnectWallet = () => {
		tonConnect?.disconnect();
		setWallet(null);
	};

	const fetchBalance = async (address: string | undefined) => {
		if (!address) return;

		try {
			const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
			const data = await response.json();
			setBalance(data.result);
		} catch (error) {
			console.error('Ошибка получения баланса:', error);
		}
	};

  return (
    <header className={styles.header}>
    <h1>Ton Wallet</h1>
    
      <p className={styles.balance}>Balance: {balance} TON</p>
      
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
