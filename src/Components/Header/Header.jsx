import { PureComponent, useState, useEffect } from 'react'
import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';



const Header = ({walletAddress='123', }) => {

	const [test, setTest] = useState("");

	return 
		(
		<div className='213'>213123
		<Button variant="primary" className="float-end mt-5 py-2" > 
	                    {walletAddress !== "Not connected" ? (
	                      "Connected: " +
	                      String(walletAddress).substring(0, 6) +
	                      "..." +
	                      String(walletAddress).substring(38)
	                    ) : (
	                      <span>Connect Wallet</span>
	                    )}
	    </Button>
	    <p>12123</p>
		</div>
		);

};


const Btn = ({walletAddress, connectWalletPressed}) => {

	// walletPressed () => connectWalletPressed();

	return (
		<Button variant="primary" className="float-end mt-5 py-2" onClick={connectWalletPressed}> 
	                    {walletAddress !== "Not connected" ? (
	                      "Connected: " +
	                      String(walletAddress).substring(0, 6) +
	                      "..." +
	                      String(walletAddress).substring(38)
	                    ) : (
	                      <span>Connect Wallet</span>
	                    )}
	    </Button>
    )
};

export default Header;

