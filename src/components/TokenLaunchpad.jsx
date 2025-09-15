import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { MINT_SIZE, TOKEN_2022_PROGRAM_ID,
        createMintToInstruction, createInitializeMintInstruction, 
        createAssociatedTokenAccountInstruction, getOrCreateAssociatedTokenAccount, getAssociatedTokenAddressSync,
        getMintLen , TYPE_SIZE, LENGTH_SIZE, ExtensionType, mintTo, 
        createInitializeMetadataPointerInstruction, 

      
      } from "@solana/spl-token";

import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";



export function TokenLaunchpad() {

  const { connection } = useConnection();
  const { wallet } = useWallet();
  

async function createToken(){

  const mintKeypair = Keypair.generate();

  const metadata = {
    mint : mintKeypair.publicKey, 
    name : ATOR, 
    symbol: ATR, 
    uri: 'https://cdn-icons-png.flaticon.com/128/14446/14446199.png',
    additionalMetaData: [],

  }

  const mintLen = getMintLen([ExtensionType.MetadataPointer]);
  const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
  const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

  const transaction = new Transaction().add(

      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: mintLen , lamports,
        programId: TOKEN_2022_PROGRAM_ID

      }),

      createInitializeMintInstruction(mintKeypair.publicKey,9, wallet.publicKey, 
        mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),

      createInitializeMetadataPointerInstruction(mintKeypair.publicKey, wallet.publicKey,
                                                 mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),

        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintKeypair,publicKey,
          metadata: mintKeypair.publicKey,
          name: metadata.name,
          symbol: metadata.name,
          uri: metadata.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        }),

  );

  transaction.feePayer = wallet.publicKey;
  transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
  transaction.partialSign(mintKeypair);

  await wallet.sendTransaction(transaction, connection);

  console.log(`Token mint created at ${mintKeypair.publicKey.toBase58()}`);
  const associatedToken = getAssociatedTokenAddressSync(
  mintKeypair.publicKey,
  wallet.publicKey,
  false,
  TOKEN_2022_PROGRAM_ID,
  );

  console.log(associatedToken.toBase58());







  





}

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "12px", // adds spacing instead of <br />
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input className="inputText" type="text" placeholder="Name" />
      <input className="inputText" type="text" placeholder="Symbol" />
      <input className="inputText" type="text" placeholder="Image URL" />
      <input className="inputText" type="text" placeholder="Initial Supply" />
      <button className="btn" onClick={createToken}>Create a token </button>
    </div>
  );
}
