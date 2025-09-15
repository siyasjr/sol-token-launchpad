import './App.css'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { TokenLaunchpad } from './components/TokenLaunchpad'
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui'
import '@solana/wallet-adapter-react-ui/styles.css';




function App() {
  return (

    <ConnectionProvider endpoint='https://api.devnet.solana.com'>
      <WalletProvider wallets={[]}>
        <WalletModalProvider>

          <div style={{display: 'flex',
                       justifyContent: 'space-between',
                       padding: 20,
                      
          }}>

            <WalletMultiButton />
            <WalletDisconnectButton />

            
            </div>

    <TokenLaunchpad></TokenLaunchpad>

     </WalletModalProvider>
      </WalletProvider>
     </ConnectionProvider>


  )
}

export default App
