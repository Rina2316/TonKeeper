"use client"
import React from 'react';
import styles from "./TransactionPage.module.scss";
import { useEffect, useState } from "react";
import TonConnect, { Wallet } from "@tonconnect/sdk";
import { FRONT_URL } from "../../../core/constants/front-url";
import Image from 'next/image';
import background_img from "../../../public/background_img.png";


const TransactionPage = () => {

	const [amount, setAmount] = useState<string>()
	const [receiver, setReceiver] = useState<string>()
  const [wallet, setWallet] = useState<Wallet | null>(null);
	let tonConnect: TonConnect | null = null

  
	useEffect(() => {
		if (typeof window !== 'undefined') {
			tonConnect = new TonConnect({
				manifestUrl: `${FRONT_URL}/tonconnect-manifest.json`,
			});
			console.log(tonConnect);

			const unsubscribe = tonConnect.onStatusChange((walletInfo) => {
				setWallet(walletInfo);
				console.log('here');

			});

			return () => unsubscribe();
		}
	}, []);

  const handleAmountChange = (e: any) => {
		setAmount(e?.target?.value)
	}

	const handleReceiverChange = (e: any) => {
		setReceiver(e?.target?.value)
	}

  
	const sendTransaction = async () => {
		if (!wallet || !amount || !receiver) {
			alert("Пожалуйста, заполните все поля!");
			return;
		}

		try {
			const nanoAmount = BigInt(parseFloat(amount) * 1e9);

			const transaction = {
				validUntil: Math.floor(Date.now() / 1000) + 300,
				messages: [
					{
						address: receiver,
						amount: nanoAmount.toString(), 
					},
				],
			};

			await tonConnect?.sendTransaction(transaction);
			alert("Транзакция отправлена!");

		} catch (error) {
			console.error("Ошибка отправки транзакции:", error);
			alert("Не удалось отправить транзакцию");
		}
	};

  return (
	<div  className={styles.transactionPage}>
		<div className={styles.background}>
		<Image
          src={background_img}
          alt=""
          fill
          priority
          sizes="(max-width: 800px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.background_img}
        />
		</div>
	

	<div className={styles.transaction}>
	<h1>Transaction</h1>
      <input type="text" placeholder="Amount in TON" value={amount} onChange={handleAmountChange} />
			<input type="text" placeholder="Recipient Address" value={receiver} onChange={handleReceiverChange} />
			<button onClick={sendTransaction}>Send</button>
    </div>
	
	</div>
   
  );
};

export default TransactionPage;
