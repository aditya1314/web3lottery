import React, { useState } from 'react';
import Web3 from 'web3';

function MetamaskConnector() {
  const [web3, setWeb3] = useState(null);
  const [connStatus, setConnStatus] = useState(null);

  const connectToMetamask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.getAccounts();
        setConnStatus(`Connected to Metamask with address: ${accounts[0]}`);
      } catch (err) {
        console.error(err);
        setConnStatus('Error while Connecting');
      }
    } else {
      console.error('Metamask not detected');
      setConnStatus('Metamask not detected');
    }
  };

  return (
    <div>
      <button type="button" className="btn btn-outline-info" onClick={()=>connectToMetamask() }>Connect to Metamask</button><br/>
      {(
        <p className="badge text-bg-primary">{connStatus}</p>
      )}
    </div>
  );
}

export default MetamaskConnector;
