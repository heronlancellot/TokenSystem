import { Contract, providers, utils } from "ethers";
import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import styles from '../styles/Home.module.css'

export default function Home() {

  const [WalletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

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

  return (
    <div>
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

      <footer className={styles.footer}>
          Powered by StreaX
      </footer>
    </div>
  )
}
