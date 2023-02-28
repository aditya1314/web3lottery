import React, { useState } from 'react';
import Web3 from 'web3';
import ContractABI from './ContractABI.json';

function ContractCaller() {

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [result2, setResult2] = useState(null);
  const [result3, setResult3] = useState(null);
  const [amount, setAmount] = useState(0);
  const [resultInEth, setresultInEth] = useState(null);
  const [result4, setResult4] = useState(null);
  const [result5, setResult5] = useState(false);
  const [players, setPlayers] = useState([]);

  const connectToWeb3 = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const contractInstance = new web3Instance.eth.Contract(
          ContractABI,
          '0xec40bb98e34a4a188a9bde981223bb5a30a2d8ae' // replace with your contract address
        );
        setContract(contractInstance);
        setResult4('Contract Connected');
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error('Web3 not detected');
      setResult4('Contract not Connected')
    }
  };

  const callContractFunction = async () => {
    try {
      const response = await contract.methods.ContractBalance().call();
      setresultInEth(web3.utils.fromWei(response, 'ether'));
    } catch (err) {
      console.error(err);
    }
  };

  const callFetchPlayersFunction = async () => {
    try {
      const response = await contract.methods.getPlayers().call();
      setPlayers(response);
      setResult5(true);
    } catch (err) {
      console.error(err);
    }
  };

  const callEnterGameFunction = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
      await contract.methods.Enter().send({ from: accounts[0], value: weiAmount });
      setResult2('Transaction successful');
    } catch (err) {
      console.error(err);
      setResult2('Transaction failed');
    }
  };

  const callPickWinnerFunction = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const weiAmount = web3.utils.toWei(amount.toString(), 'ether');
      await contract.methods.pickWinner().send({ from: accounts[0], value: weiAmount });
      setResult3('Transaction successful');
    } catch (err) {
      console.error(err);
      setResult3('Transaction failed');
    }
  };

  return (
    <div>
      <button  type="button" className="btn btn-outline-warning" onClick={connectToWeb3}>Connect to Lottery Contract</button><br/>
      {result4 && <p className="badge text-bg-primary">Status: {result4}</p>}
      <br/>
      <br/>

      <button type="button" className="btn btn-outline-warning" onClick={callContractFunction} disabled={!web3 || !contract}>
        Fetch Contract's Balance
      </button><br/>
      {resultInEth && <p className="badge text-bg-primary">Smart Contract Corrently has: {resultInEth} eth</p>}

      
      <br/>
      <br/>
      <button type="button" className="btn btn-outline-success" onClick={callFetchPlayersFunction} disabled={!web3 || !contract}>
        View Players
      </button><br/>
      {result5 && (
        <div>
          <p className="badge text-bg-primary">List of Players:</p>
          {players.map((player, index) => (
          <div key={index} className="badge text-bg-secondary" style={{ display: 'block' }}>
            {player}
          </div>
        ))}
        </div>
      )}

      <br/>
      <br/>
      <input type="number" step="0.001" value={amount} onChange={e => setAmount(e.target.value)} />
      <button type="button" className="btn btn-outline-danger" onClick={callEnterGameFunction} disabled={!web3 || !contract}>
        Enter Game
      </button><br/>
      {result2 && <p className="badge text-bg-primary">{result2}</p>}

      <br/>
      <br/>
      <button type="button" className="btn btn-outline-success" onClick={callPickWinnerFunction} disabled={!web3 || !contract}>
        Pick Winner
      </button><br/>
      {result3 && <p className="badge text-bg-primary">{result3}</p>}
    </div>
  );
}

export default ContractCaller;