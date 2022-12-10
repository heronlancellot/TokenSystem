import { Contract, providers, utils } from "ethers";
import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react";
import { abi, TOKEN_CONTRACT_ADDRESS} from '../constants/index'
import Web3Modal from "web3modal";
import styles from '../styles/Home.module.css'

export default function Home() {

  const inputMintValue = useRef(null);
  const [mintValue, setMintValue] = useState('');

  const inputAddressValue = useRef(null);
  const [addressValue, setAddressValue] = useState('');

  const inputTokenValue = useRef(null);
  const [tokenValue, setTokenValue] = useState('');

  const [WalletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const mintClick = async () => {

    setMintValue(inputMintValue.current.value); 
    try {
      const signer = await getProviderOrSigner(true);
      const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS, abi, signer);
      if(mintValue > 0){
        window.alert(`You will Mint ${mintValue} are you sure?`);
        const tx = await tokenContract.mint(mintValue);
        await tx.wait();
        window.alert(`Mint ${mintValue} StreaX tokens`);
        console.log(`Mint ${mintValue} StreaX tokens`);
      }else{
        window.alert("Error Mint");
        console.log(`Value mint Token ERROR: ${mintValue} should be > 0`);
      }
    
    } catch (err) {
      console.error(err);
    }

  };

  const transferClick = async () => {
    setAddressValue(inputAddressValue.current.value);
    setTokenValue(inputTokenValue.current.value);
    try {
      const signer = await getProviderOrSigner(true);
      const tokenContract = new Contract(TOKEN_CONTRACT_ADDRESS, abi, signer);
      if(tokenValue > 0){
        window.alert(`You will Transfer ${tokenValue} to this address ${addressValue} are you sure?`);
        const tx = await tokenContract.transfer(addressValue, tokenValue);
        await tx.wait();
      }else {
        window.alert("Error Transfer");
        console.log(`Value transfer ERROR: ${tokenValue} should be > 0`);
      }

    } catch (err){
      console.error(err);
    }

  };

  const getProviderOrSigner = async (needSigner = false) => {
    
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change newtork to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {

    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch(err){
      console.error(err);
    }
  };

  useEffect(() => {

    if(!WalletConnected) {

      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
    
  }, [WalletConnected]);

  const ButtonMetamask = () => {

  if(!WalletConnected){
      return (
        <button onClick={connectWallet} className={styles.btn}> 
          Connect your Wallet
        </button>
      )
    };
  }

  const ButtonMint = () => {

    if(WalletConnected == true){
      return (
        <>
        <h2>Value: {mintValue}</h2>
        <input ref={inputMintValue}
          type="number" 
          min="1"
          />
          <button onClick={mintClick}>Mint</button>
        </>
      )
    };
  }

  const ButtonTransfer = () => {

    if(WalletConnected == true){
      return(
        <>
        <h2>Address: {addressValue}</h2>
        <input ref={inputAddressValue}
        type="text"   
        maxlength="42"/> 
        <h2>Token STX amount: {tokenValue}</h2>
        <input ref={inputTokenValue}
          type="number"
          min="1"
          max="10" />
        
        <button onClick={transferClick}>Transfer</button>
        
        </>
      )
    };
  }

  return (

    <div className={styles.container}>
      <Head>
        <title>StreaX</title>
        <link rel="icon" href="./logo-streax.jpg"/>
      </Head>
      <div className={styles.metamask}>
        {ButtonMetamask()}
      </div>

      <div className={styles.main}>
          <h1>Let's fix the communication at Web3</h1>
      </div>

      <div className={styles.cards}>

        <div className={styles.card}>
          <h1>Card 1 - Mint STX</h1>
          {ButtonMint()}
        </div>

        <div className={styles.card}>
          <h1>Card 2 - Transfer STX</h1>
          {ButtonTransfer()}
        </div>
      </div>

      <footer className={styles.footer}>
          Powered by StreaX
      </footer>

    </div>
  )
}
