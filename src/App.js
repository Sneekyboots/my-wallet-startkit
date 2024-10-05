import React, { useState } from 'react';
import WalletModal from './components/WalletModal';
import './App.css'; // You can add global styles here
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [showWalletModal, setShowWalletModal] = useState(false);

  const toggleWalletModal = () => {
    setShowWalletModal(!showWalletModal);
  };

  return (
    <div className="App flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">My Custom Wallet</h1>
      <button
        onClick={toggleWalletModal}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        {showWalletModal ? 'Close Wallet' : 'Open Wallet'}
      </button>
      {showWalletModal && <WalletModal onClose={toggleWalletModal} />}
    </div>
  );
}

export default App;
