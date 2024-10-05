import React, { useState, useRef } from 'react';
import './WalletModal.css'; // Import CSS file
import BuySell from './BuySell';
import Send from './Send';
import Swap from './Swap';
import Bridge from './Bridge';
import Portfolio from './Portfolio';

const WalletModal = ({ onClose }) => {
  const [balance, setBalance] = useState(0);
  const [ethAmount, setEthAmount] = useState('');
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [activeComponent, setActiveComponent] = useState(null);
  const modalRef = useRef(null);

  const handleFundWallet = () => {
    if (!ethAmount || isNaN(ethAmount) || ethAmount <= 0) {
      alert("Please enter a valid amount to fund your wallet");
      return;
    }
    
    const newBalance = balance + parseFloat(ethAmount);
    setBalance(newBalance);
    setEthAmount('');

    const newTransaction = {
      type: 'Funded',
      amount: parseFloat(ethAmount).toFixed(2),
      date: new Date().toLocaleString(),
    };

    setTransactionHistory((prev) => [...prev, newTransaction]);
  };

  const handleConnectWallet = () => {
    alert('Wallet connected!'); // Simulate wallet connection
  };

  // Handle dragging functionality
  const handleMouseDown = (e) => {
    const modal = modalRef.current;
    const shiftX = e.clientX - modal.getBoundingClientRect().left;
    const shiftY = e.clientY - modal.getBoundingClientRect().top;

    const onMouseMove = (e) => {
      modal.style.left = `${e.pageX - shiftX}px`;
      modal.style.top = `${e.pageY - shiftY}px`;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'BuySell':
        return <BuySell />;
      case 'Send':
        return <Send />;
      case 'Swap':
        return <Swap />;
      case 'Bridge':
        return <Bridge />;
      case 'Portfolio':
        return <Portfolio />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div 
        className="modal-content draggable"
        ref={modalRef}
        onMouseDown={handleMouseDown}
        style={{ position: 'absolute', cursor: 'move' }}
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3 className="modal-title">Account 1</h3>
        <p className="account-balance">{balance.toFixed(2)} ETH</p>
        <p className="account-usd">${(balance * 1800).toFixed(2)} USD</p>
        
        <button className="connect-button" onClick={handleConnectWallet}>
          <i className="fas fa-wallet"></i> Connect Wallet
        </button>

        <div className="button-container">
          <button className="action-button buy-sell" onClick={() => setActiveComponent('BuySell')}>
            <i className="fas fa-shopping-cart"></i> Buy & Sell
          </button>
          <button className="action-button send" onClick={() => setActiveComponent('Send')}>
            <i className="fas fa-paper-plane"></i> Send
          </button>
          <button className="action-button swap" onClick={() => setActiveComponent('Swap')}>
            <i className="fas fa-sync-alt"></i> Swap
          </button>
          <button className="action-button bridge" onClick={() => setActiveComponent('Bridge')}>
            <i className="fas fa-exchange-alt"></i> Bridge
          </button>
          <button className="action-button portfolio" onClick={() => setActiveComponent('Portfolio')}>
            <i className="fas fa-chart-line"></i> Portfolio
          </button>
        </div>

        {renderActiveComponent()}

        <div className="fund-wallet">
          <h4 className="fund-wallet-title">Fund your wallet</h4>
          <div className="fund-wallet-input-wrapper">
            <input
              type="number"
              placeholder="Enter amount in ETH"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className="eth-input"
            />
            <span className="eth-label">ETH</span>
          </div>
          <button onClick={handleFundWallet} className="fund-button">
            <i className="fas fa-coins"></i> Buy ETH
          </button>
        </div>

        <h4 className="transaction-title">Transaction History</h4>
        <div className="transaction-history">
          {transactionHistory.length > 0 ? (
            transactionHistory.map((transaction, index) => (
              <div key={index} className="transaction-item">
                <p>{transaction.date}: <strong>{transaction.type}</strong> {transaction.amount} ETH</p>
              </div>
            ))
          ) : (
            <p>No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
