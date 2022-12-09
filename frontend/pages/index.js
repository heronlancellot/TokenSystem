import { Contract, providers, utils } from "ethers";
import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import styles from '../styles/Home.module.css'

export default function Home() {

  const inputValue = useRef(null);
  const [mintValue, setMintValue] = useState('');
  const [WalletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const mintClick = () => {
    setMintValue(inputValue.current.value);
    var totalSupply = 100;

    // If Value < total Supply ( 10.000 )
    if(mintValue <= totalSupply && mintValue > 0){
      window.alert('Mint!');
      console.log(mintValue);
      
    }else{
      window.alert("Error");
      console.log('valor error', mintValue);
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
    
    ButtonMint()

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
        <><input ref={inputValue}
          type="number"
          id="message"
          name="message"
          min="1"
          max="10" /><h2>Value: {mintValue}</h2><button onClick={mintClick}>Update</button>
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

      <div className={styles.card}>
        <h1>Card 1 - Mint STX</h1>
        {ButtonMint()}
      </div>

      <footer className={styles.footer}>
          Powered by StreaX
      </footer>
    </div>
  )
}
