"use client";
import "../styles/globals.scss";
import { TonConnectUIProvider } from '@tonconnect/ui-react'; 
import Header from '../components/Header';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { WalletProvider } from '../context/WalletContext';
import { Toaster } from 'react-hot-toast';

const manifestUrl = "https://your-domain.com/tonconnect-manifest.json";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); 
  const router = useRouter();
  const isWalletScreen = pathname === '/wallet';
  const isTransactionScreen = pathname === '/transaction';

  const handleBack = () => {
    router.push('/wallet');
  };

  return (
    <html lang="en">
       <head>
       <meta charSet="UTF-8" />
        <meta name="description" content="Wallet for TonKeeper" />
        <meta name="author" content="Jarcova Yekaterina" />
        <title>TonKeeper</title>
        <meta property="og:title" content="TonKeeper" />
        <meta property="og:description" content="Wallet for TonKeeper" />
        <meta name="viewport" content="user-scalable=no,width=device-width" />
      </head>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
      <WalletProvider>
        <body>
          <main>
            <Header
              isWalletScreen={isWalletScreen} 
              isTransactionScreen={isTransactionScreen} 
              onBack={handleBack} 
            />
            <Toaster />
            {children}
          </main>
        </body>
        </WalletProvider>
      </TonConnectUIProvider>
    </html>
  );
}
