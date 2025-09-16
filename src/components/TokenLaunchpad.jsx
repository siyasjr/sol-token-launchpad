import { useState } from "react"
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import {
  TOKEN_2022_PROGRAM_ID,
  createMintToInstruction,
  createAssociatedTokenAccountInstruction,
  getMintLen,
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  TYPE_SIZE,
  LENGTH_SIZE,
  ExtensionType,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token"
import {
  createInitializeInstruction,
  pack,
} from "@solana/spl-token-metadata"

export function TokenLaunchpad() {

  const { connection } = useConnection()
  const wallet = useWallet()

  // 🔹 React state for inputs
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [uri, setUri] = useState("")
  const [supply, setSupply] = useState("")

    async function createToken() {
    if (!wallet.publicKey) {
      alert("Connect your wallet first")
      return
    }

    const mintKeypair = Keypair.generate()
    const metadata = {
      mint: mintKeypair.publicKey,
      name,
      symbol,
      uri,
      additionalMetadata: [],
    }

    
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h1>Solana Token Launchpad</h1>

      <input
        className="inputText"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="inputText"
        type="text"
        placeholder="Symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />

      <input
        className="inputText"
        type="text"
        placeholder="Metadata URI"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
      />

      <input
        className="inputText"
        type="number"
        placeholder="Initial Supply (tokens)"
        value={supply}
        onChange={(e) => setSupply(e.target.value)}
      />

      <button onClick={createToken} className="btn">
        Create Token
      </button>
    </div>
  )
}
