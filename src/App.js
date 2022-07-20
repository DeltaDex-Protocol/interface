import { useEffect, useState, useCallback } from 'react';

// import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

// import my other component 
import RegisterForm from './Components/Forms/RegisterForm/RegisterForm'
import Panel from './Components/Panel/Panel';
import LoginForm from './Components/Forms/LoginForm/LoginForm';

// import utils
import { getStorage } from './utils/storage';

// kirill
import Button from 'react-bootstrap/Button'
import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";


const App = () => {

  const [toggle, setToggle] = useState('');

  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
    
  const changeToggle = (toggle) => setToggle(toggle)
  
  const checkIsInitStorage = () => getStorage('users') && getStorage('users').length !== 0

  
  const checkUserIsRegister = useCallback(() => {
    changeToggle('panel');
  //   if (checkIsInitStorage()) {
  //     const userId = getStorage('id')
  //     const users = getStorage('users')
      
  //     const [userRegistered] = users.filter(user => user.id === userId)
      
  //     userRegistered.isLogin && changeToggle('panel')
  //     !userRegistered.isLogin && changeToggle('login')
  //   } else changeToggle('register') 
  }, [])

  useEffect(() => {
    const func = async () => {
      const {address, status} = await getCurrentWalletConnected();
      if (address) {
      setWallet(address.slice(0, 7) + "..." + address.slice(-6, ));
    }
      setStatus(status);
    }
    func().then( () => {
      checkUserIsRegister()
      // changeAddress(this.state.address)

    }
      )
    
  }, [checkUserIsRegister, walletAddress])

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);

  };
  
  
  return (
     <>

        <Button variant="primary" className="float-end mt-5 py-2" onClick={connectWalletPressed}> 
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
        </Button>

     {/*{console.log(getStorage('users'))}*/}
      { toggle === 'register' && <RegisterForm onRegister={checkUserIsRegister}  onLogin={changeToggle} /> }
      { toggle === 'login' && <LoginForm onRegister={changeToggle} onLogin={checkUserIsRegister} /> }
      { toggle === 'panel' && <Panel onLogOut={checkUserIsRegister} onAddress={walletAddress}/> }
    </>
  )
}

export  default App