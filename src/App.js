import './App.css';
import Contractconnect from './Components/contractconnect';
import ConnectWallet from './Components/connectWallet';
import Navbar from './Components/Navbar';
import Test from './Components/test';


function App() {
    return (
      
      <div className="App">
        <Navbar/>
          <p class="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
            Welcome to Etherium based Web 3 Lottery Game
          </p>
          <br/>
          <ConnectWallet/>
          <br/>
          <Contractconnect/>
          <Test/>
       </div>

       
    );
}

export default App;
