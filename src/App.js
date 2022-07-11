import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import MartianRouter from './MartianRouter.json';
import MartianToken from './MartianToken.json';
import AutoLP from './AutoLP.json';


const INFURA_ENDPOINT = 'https://data-seed-prebsc-1-s3.binance.org:8545/';
const CONTRACT_ADDRESS = '0x627472ac3B206D42DC5DF21A5c35D8F714435d90';
const CONTRACT_ADDRESS2 = '0x0dF1C0E1b0A0bdfDEc10809Bc4014D14bDAf9662';
const CONTRACT_ADDRESS3 = '0xe2Dcd8b48879f597FA9481b9ceF4c287E2FF7923';



function App() {
  const [owner, setOwner] = useState('');
  const [lastPrice, setLastPrice] = useState(0);
  const[userClaim, setUserClaim] = useState('');
  const[userBalance, setUserBalance] = useState('');
  const[userList, setUserList] = useState('');
  const[userDeposits, setUserDeposits] = useState('');
  const[Players, setPlayers] = useState('');
  const[lowestValue, setLowestValue] = useState('');
  const[totalSupply, setTotalSupply] = useState('');
  const[ethBalance, setEthBalance] = useState('');

  if (userList ==0){
    var greeting = "User is not on list";
  } else {
    var greeting = "User has active slot position at slot " + userList;
  }


  const [accounts, setAccounts] = useState([]);
  const [price, setPrice] = useState(0);

  const [changeCounter, setChangeCounter] = useState(0);

  useEffect(() => {
    const web3 = new Web3(window.web3.currentProvider);
    const contract = new web3.eth.Contract(MartianRouter.abi, CONTRACT_ADDRESS);
    const contract2 = new web3.eth.Contract(MartianToken.abi, CONTRACT_ADDRESS2);
    const contract3 = new web3.eth.Contract(AutoLP.abi, CONTRACT_ADDRESS3);


    contract.methods.owner().call()
      .then(setOwner)
      contract.methods.getUserClaim().call({from: accounts[0]})
      .then(setUserClaim) 
      contract2.methods.getBalance().call({from: accounts[0]})
      .then(setUserBalance) 
      contract2.methods.totalSupply().call()
      .then(setTotalSupply)
      contract3.methods.getETHbalance().call()
      .then(setEthBalance)
      contract.methods.getUserDeposits().call()
      .then(setUserDeposits)
      contract.methods.getPlayers().call()
      .then(setPlayers)
      contract.methods.doesUserHaveSlot().call()
      .then(setUserList)
    contract.methods.getLowestValue().call()
    .then(setLowestValue)
    contract.methods.lastSaleAmount().call()
      .then((_lastPrice) => {
        setLastPrice(_lastPrice);
        setPrice(_lastPrice + 1)
      })


  }, [changeCounter])


  useEffect(() => {
    if (Web3.givenProvider) {
      const web3 = new Web3(Web3.givenProvider);

      web3.eth.getAccounts().then(setAccounts);
    }
  }, [])


  const handleConnect = () => {
    Web3.givenProvider.send('eth_requestAccounts')
      .then(response => setAccounts(response.result));
  }

  const handleBuy = e => {
    e.preventDefault();
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(MartianRouter.abi, CONTRACT_ADDRESS);


  contract.methods.addSelf(price)
      .send({ from: accounts[0]});
}
  const handleClaim = e => {
    e.preventDefault();
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(MartianRouter.abi, CONTRACT_ADDRESS);

  contract.methods.routerClaim()
  .send({from: accounts[0]});
}

  const handleSwapNBurn = e => {
    e.preventDefault();
    const web3 = new Web3(Web3.givenProvider);
    const contract3 = new web3.eth.Contract(AutoLP.abi, CONTRACT_ADDRESS3);

  contract3.methods.swapAndBurn()
  .send({from: accounts[0]});
}

  const handleSwapNLiquify = e => {
    e.preventDefault();
    const web3 = new Web3(Web3.givenProvider);
    const contract3 = new web3.eth.Contract(AutoLP.abi, CONTRACT_ADDRESS3);

  contract3.methods.swapandLiquify()
  .send({from: accounts[0]});
}

  const handleWithdrawNAbandon = e => {
    e.preventDefault();
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(MartianRouter.abi, CONTRACT_ADDRESS);

  contract.methods.withdrawAndAbandonSlot()
  .send({from: accounts[0]});
}

const handleClaimAmount = e => {
  e.preventDefault();
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(MartianRouter.abi, CONTRACT_ADDRESS);

      contract.methods.getUserClaim().call({from: accounts[0]})
      .then(setUserClaim) 
}

const handleUserList = e => {
  e.preventDefault();
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(MartianRouter.abi, CONTRACT_ADDRESS);

      contract.methods.doesUserHaveSlot().call({from: accounts[0]})
      .then(setUserList) 
}

const handleBalance = e => {
  e.preventDefault();
  const web3 = new Web3(Web3.givenProvider);
  const contract2 = new web3.eth.Contract(MartianToken.abi, CONTRACT_ADDRESS2);

      contract2.methods.getBalance().call({from: accounts[0]})
      .then(setUserBalance) 
}

const handleApprove = e => {
  e.preventDefault();
  const web3 = new Web3(Web3.givenProvider);
  const contract2 = new web3.eth.Contract(MartianToken.abi, CONTRACT_ADDRESS2);

    contract2.methods.approve(CONTRACT_ADDRESS, price)
  .send({from: accounts[0]});
}
  const hasAccounts = !!accounts.length;
  const isOwner = hasAccounts && accounts[0] === owner;
window.onload = function(){ 
    // your code 

  // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
};

  return (
    <div className="App">
      <header className="App-header">

      <div className="sectionToken"> Total Supply: {Web3.utils.fromWei(totalSupply + '')} Mars
      <div> AutoLP Balance: {Web3.utils.fromWei(ethBalance + '')} ETH </div>
      <div><button onClick={handleSwapNBurn}>SwapNBurn</button> <button onClick={handleSwapNLiquify} style={{marginLeft:'10px'}}>SwapNLiquify</button></div></div>
        <div className="section">
        <small style={{fontSize: '11px', fontFamily: 'Courier New'}}> *Click text of any values to update* </small>
                  <div><label onClick={handleBalance} >Wallet: {Web3.utils.fromWei(userBalance + '')} Mars</label> </div>
          <div><label onClick={handleClaimAmount} >Claimable Mars: {Web3.utils.fromWei(userClaim + '')}</label> </div>

           <button onClick={handleClaim}>Claim</button>
          <small></small>
        </div>

        {!hasAccounts &&
          <button onClick={handleConnect}>Connect Metamask</button>
        }

        {!isOwner &&
          <form className="section" style={{ display: 'flex', flexDirection: 'column' }}
            onSubmit={handleBuy}>
            <small onClick={handleUserList} style={{fontSize: '20px', fontFamily: 'Courier New'}}> {greeting}</small> 
            <div>Bid to beat: {Web3.utils.fromWei(lowestValue + '')} MARS</div><p></p>
           <small style={{fontSize: '11px', fontFamily: 'Courier New'}}> *May only appear on list once* </small>
            <small style={{fontSize: '11px', fontFamily: 'Courier New'}}> *Must withdraw, and place bid again to raise bid* </small>

            <label>Bid Value:</label>
            <input type="number" style ={{borderRadius: '2em'}}value={price}
              onChange={e => setPrice(e.target.value)}
              min={lastPrice + 1}
            />
            <small>{Web3.utils.fromWei(price + '')} MARS</small>
            <center><button onClick={handleApprove} style = {{marginBottom: '5px'}} >Approve Mars</button></center>
            <center><button type="submit" >Place Bid</button></center>
            <small></small>
          </form>
        }

        {isOwner &&
          <form className="section"
            onSubmit={handleClaim}
            style={{ display: 'flex', flexDirection: 'column' }}>
            <label>New Text</label>

          </form>
        }
      </header>

<div className="section" style= {{padding: '.43em'}}>
      <button id="myBtn">Check Slots</button>
      <button onClick={handleWithdrawNAbandon} style={{marginLeft:'15px'}}>Withdraw&Abandon</button>
      <div id = "myModal" class="modal">
      <div class="modal-content">
      <span class="close">&times;</span>
      <center> <label style= {{fontSize: '40px'}}>Slots:</label> </center> 
      <div>Slot 0: {userDeposits[0]/1000000000000000000} : {Players[0]}
      <div> Slot 1: {userDeposits[1]/1000000000000000000} : {Players[1]} </div> 
      <div>Slot 2: {userDeposits[2]/1000000000000000000} : {Players[2]} </div> 
      <div>Slot 3: {userDeposits[3]/1000000000000000000} : {Players[3]} </div>
      <div> Slot 4: {userDeposits[4]/1000000000000000000} : {Players[4]} </div> 
      <div>Slot 5: {userDeposits[5]/1000000000000000000} : {Players[5]} </div> 
      <div>Slot 6: {userDeposits[6]/1000000000000000000} : {Players[6]} </div>
      <div> Slot 7: {userDeposits[7]/1000000000000000000} : {Players[7]} </div> 
      <div>Slot 8: {userDeposits[8]/1000000000000000000} : {Players[8]} </div> 
      <div>Slot 9: {userDeposits[9]/1000000000000000000} : {Players[9]} </div>
      <div> Slot 10: {userDeposits[10]/1000000000000000000} : {Players[10]} </div> 
      <div>Slot 11: {userDeposits[11]/1000000000000000000} : {Players[11]} </div> 
      <div>Slot 12: {userDeposits[12]/1000000000000000000} : {Players[12]} </div>
      <div> Slot 13: {userDeposits[13]/1000000000000000000} : {Players[13]} </div> 
      <div>Slot 14: {userDeposits[14]/1000000000000000000} : {Players[14]} </div> 
      <div>Slot 15: {userDeposits[15]/1000000000000000000} : {Players[15]} </div>
      <div> Slot 16: {userDeposits[16]/1000000000000000000} : {Players[16]} </div> 
      <div>Slot 17: {userDeposits[17]/1000000000000000000} : {Players[17]} </div> 
      <div>Slot 18: {userDeposits[18]/1000000000000000000} : {Players[18]} </div>
      <div> Slot 19: {userDeposits[19]/1000000000000000000} : {Players[19]} </div> 
      <div>Slot 20: {userDeposits[20]/1000000000000000000} : {Players[20]} </div> 
      <div>Slot 21: {userDeposits[21]/1000000000000000000} : {Players[21]} </div>
      <div> Slot 22: {userDeposits[22]/1000000000000000000} : {Players[22]} </div> 
      <div>Slot 23: {userDeposits[23]/1000000000000000000} : {Players[23]} </div> 
      <div>Slot 24: {userDeposits[24]/1000000000000000000} : {Players[24]} </div>
      <div> Slot 25: {userDeposits[25]/1000000000000000000} : {Players[25]} </div> 
      <div>Slot 26: {userDeposits[26]/1000000000000000000} : {Players[26]} </div> 
      <div>Slot 27: {userDeposits[27]/1000000000000000000} : {Players[27]} </div>
      <div> Slot 28: {userDeposits[28]/1000000000000000000} : {Players[28]} </div> 
      <div>Slot 29: {userDeposits[29]/1000000000000000000} : {Players[29]} </div> 
      <div>Slot 30: {userDeposits[30]/1000000000000000000} : {Players[30]} </div>
      <div> Slot 31: {userDeposits[31]/1000000000000000000} : {Players[31]} </div> 
      <div>Slot 32: {userDeposits[32]/1000000000000000000} : {Players[32]} </div> 
      <div>Slot 33: {userDeposits[33]/1000000000000000000} : {Players[33]} </div>
      <div> Slot 34: {userDeposits[34]/1000000000000000000} : {Players[34]} </div> 
      <div>Slot 35: {userDeposits[35]/1000000000000000000} : {Players[35]} </div> 
      <div>Slot 36: {userDeposits[36]/1000000000000000000} : {Players[36]} </div>
      <div> Slot 37: {userDeposits[37]/1000000000000000000} : {Players[37]} </div> 
      <div>Slot 38: {userDeposits[38]/1000000000000000000} : {Players[38]} </div> 
      <div>Slot 39: {userDeposits[39]/1000000000000000000} : {Players[39]} </div>
      <div> Slot 40: {userDeposits[40]/1000000000000000000} : {Players[40]} </div> 
      <div>Slot 41: {userDeposits[41]/1000000000000000000} : {Players[41]} </div> 
      <div>Slot 42: {userDeposits[42]/1000000000000000000} : {Players[42]} </div>
      <div> Slot 43: {userDeposits[43]/1000000000000000000} : {Players[43]} </div> 
      <div>Slot 44: {userDeposits[44]/1000000000000000000} : {Players[44]} </div> 
      <div>Slot 45: {userDeposits[45]/1000000000000000000} : {Players[45]} </div>
      <div> Slot 46: {userDeposits[46]/1000000000000000000} : {Players[46]} </div> 
      <div>Slot 47: {userDeposits[47]/1000000000000000000} : {Players[47]} </div> 
      <div>Slot 48: {userDeposits[48]/1000000000000000000} : {Players[48]} </div>
      <div> Slot 49: {userDeposits[49]/1000000000000000000} : {Players[49]} </div> 
      <div>Slot 50: {userDeposits[50]/1000000000000000000} : {Players[50]} </div> 
      <div>Slot 51: {userDeposits[51]/1000000000000000000} : {Players[51]} </div>
      <div> Slot 52: {userDeposits[52]/1000000000000000000} : {Players[52]} </div> 
      <div>Slot 53: {userDeposits[53]/1000000000000000000} : {Players[53]} </div> 
      <div>Slot 54: {userDeposits[54]/1000000000000000000} : {Players[54]} </div>
      <div> Slot 55: {userDeposits[55]/1000000000000000000} : {Players[55]} </div> 
      <div>Slot 56: {userDeposits[56]/1000000000000000000} : {Players[56]} </div> 
      <div>Slot 57: {userDeposits[57]/1000000000000000000} : {Players[57]} </div>
      <div>Slot 58: {userDeposits[58]/1000000000000000000} : {Players[58]} </div> 
      <div>Slot 59: {userDeposits[59]/1000000000000000000} : {Players[59]} </div> 
      <div>Slot 60: {userDeposits[60]/1000000000000000000} : {Players[60]} </div>
      <div> Slot 61: {userDeposits[61]/1000000000000000000} : {Players[61]} </div> 
      <div>Slot 62: {userDeposits[62]/1000000000000000000} : {Players[62]} </div> 
      <div>Slot 63: {userDeposits[63]/1000000000000000000} : {Players[63]} </div>
      <div> Slot 64: {userDeposits[64]/1000000000000000000} : {Players[64]} </div> 
      <div>Slot 65: {userDeposits[65]/1000000000000000000} : {Players[65]} </div> 
      <div>Slot 66: {userDeposits[66]/1000000000000000000} : {Players[66]} </div>
      <div> Slot 67: {userDeposits[67]/1000000000000000000} : {Players[67]} </div> 
      <div>Slot 68: {userDeposits[68]/1000000000000000000} : {Players[68]} </div> 
      <div>Slot 69: {userDeposits[69]/1000000000000000000} : {Players[69]} </div>
      <div> Slot 70: {userDeposits[70]/1000000000000000000} : {Players[70]} </div> 
      <div>Slot 71: {userDeposits[71]/1000000000000000000} : {Players[71]} </div> 
      <div>Slot 72: {userDeposits[72]/1000000000000000000} : {Players[72]} </div>
      <div> Slot 73: {userDeposits[73]/1000000000000000000} : {Players[73]} </div> 
      <div>Slot 74: {userDeposits[74]/1000000000000000000} : {Players[74]} </div> 
      <div>Slot 75: {userDeposits[75]/1000000000000000000} : {Players[75]} </div>
      <div> Slot 76: {userDeposits[76]/1000000000000000000} : {Players[76]} </div> 
      <div>Slot 77: {userDeposits[77]/1000000000000000000} : {Players[77]} </div> 
      <div>Slot 78: {userDeposits[78]/1000000000000000000} : {Players[78]} </div>
      <div> Slot 79: {userDeposits[79]/1000000000000000000} : {Players[79]} </div> 
      <div>Slot 80: {userDeposits[80]/1000000000000000000} : {Players[80]} </div> 
      <div>Slot 81: {userDeposits[81]/1000000000000000000} : {Players[81]} </div>
      <div> Slot 82: {userDeposits[82]/1000000000000000000} : {Players[82]} </div> 
      <div>Slot 83: {userDeposits[83]/1000000000000000000} : {Players[83]} </div> 
      <div>Slot 84: {userDeposits[84]/1000000000000000000} : {Players[84]} </div>
      <div> Slot 85: {userDeposits[85]/1000000000000000000} : {Players[85]} </div> 
      <div>Slot 86: {userDeposits[86]/1000000000000000000} : {Players[86]} </div> 
      <div>Slot 87: {userDeposits[87]/1000000000000000000} : {Players[87]} </div>
      <div> Slot 88: {userDeposits[88]/1000000000000000000} : {Players[88]} </div> 
      <div>Slot 89: {userDeposits[89]/1000000000000000000} : {Players[89]} </div> 
      <div>Slot 90: {userDeposits[90]/1000000000000000000} : {Players[90]} </div>
      <div>Slot 91: {userDeposits[91]/1000000000000000000} : {Players[91]} </div> 
      <div>Slot 92: {userDeposits[92]/1000000000000000000} : {Players[92]} </div>
      <div> Slot 93: {userDeposits[93]/1000000000000000000} : {Players[93]} </div> 
      <div>Slot 94: {userDeposits[94]/1000000000000000000} : {Players[94]} </div> 
      <div>Slot 95: {userDeposits[95]/1000000000000000000} : {Players[95]} </div>
      <div> Slot 96: {userDeposits[96]/1000000000000000000} : {Players[96]} </div> 
      <div>Slot 97: {userDeposits[97]/1000000000000000000} : {Players[97]} </div> 
      <div>Slot 98: {userDeposits[98]/1000000000000000000} : {Players[98]} </div>
      <div>Slot 99: {userDeposits[99]/1000000000000000000} : {Players[99]} </div>
      
      
</div>

      </div>
    </div></div></div>
  );
}

export default App;
