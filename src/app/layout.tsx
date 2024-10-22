"use client";
import "../styles/globals.scss";
import { TonConnectUIProvider } from '@tonconnect/ui-react'; 
import Header from '../components/Header';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

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
        <meta name="viewport" content="user-scalable=no,width=device-width" />
      </head>
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <body>
          <main>
            <Header
              isWalletScreen={isWalletScreen} 
              isTransactionScreen={isTransactionScreen} 
              onBack={handleBack} 
            />
            {children}
          </main>
        </body>
      </TonConnectUIProvider>
    </html>
  );
}
