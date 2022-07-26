import { PureComponent, useState, useEffect } from 'react'
import { createPortal } from 'react-dom';

// import styles of this component
import styles from './Panel.module.css'

// import other component
import UserCard from './UserCard/UserCard'
import UserInformation from './UserInformation/UserInformation'
import UserChangePassword from './UserChangePassword/UserChangePassword'

// import other pkgs
import { UserEdit, Lock, ProfileCircle, Code1 } from "iconsax-react";
import { Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

// import utils
import { getStorage, updateStorage } from './../../utils/storage';
import { connectWallet, getCurrentWalletConnected } from "./../../utils/interact.js";
import Sidebar from '../Sidebar/Sidebar'
import Header from "./../Header/Header.jsx";
// import TradingViewWidget, { Themes } from 'react-tradingview-widget';


const Panel = () => {

    const sidebarLinks = [
            {
                id: 1,
                border: true,
                text: 'Replicate option',
                description: 'Start the replication with arbitrary parameters',
                active: true,
            },
            {
                id: 2,
                border: true,
                text: 'My positions',
                description: 'Click to see your previous replications',
                active: false,
            },
            {
                id: 3,
                border: true,
                text: 'All positions',
                description: "Check users' positions close to hedging",
                active: false,
            },
        ]

    const [toggle, setToggle] = useState("Replicate option");
    const [walletAddress, setWallet] = useState("Not connected");
    const [status, setStatus] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [url, setURL] = useState("");
    const [data, setData] = useState([]);


    const connectWalletPressed = async () => { 
        const walletResponse = await connectWallet();
        let address = walletResponse.address;

        if (address) {
            address = address.slice(0, 7) + "..." + address.slice(-6, );
        }

        // this.setState({
        //     status: walletResponse.status,
        //     walletAddress: address
        // });
        // console.log(walletResponse);

        setStatus(walletResponse.status);
        setWallet(address);

    };

    const changeToggle = (toggle) => {
        setToggle(toggle);
    };


    useEffect(() => {
        const fetchData = async () => {
                const link = "https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=360";

                const response = await fetch(link);

                return response.json();

            };  

        fetchData().then((_data) => {
            
            _data = _data.map(
                (el) => {

                    return {
                    time: (new Date(el[0]).toLocaleDateString("en-US")).split('/').join('-'), 
                    value: ( (parseInt(el[1]) + parseInt(el[4])) / 2),
                    }
                });

            setData(_data);
            // console.log(_data);
        });
    }, []);


    return (
            <>
            
            <Header walletAddress={walletAddress} connectPressed={connectWalletPressed}/>
            <div className={`${styles['panel-wrapper']}  px-5 `}>
                


            <div className={`${styles['panel-wrapper']} d-flex`}>
            <Sidebar 
                username={"Your address"}
                userAddress={walletAddress}
                userProfile={walletAddress}
                sidebarLinks={sidebarLinks}
                onChangeToggle={changeToggle}
            />


                <div className={`${styles.container} justify-content-center align-items-center p-0`}>
                    <Row className={`${styles['panel']}  `}>

                        
                        <div className={`${styles['panel-column']} bg-white border mt-5 mt-md-0  p-5`}>
                            {toggle === 'Replicate option' && (
                                <UserInformation data={data}/>
                            )}
                            {toggle === 'My positions' && (
                                <UserChangePassword />
                            )}
                        </div>
                    </Row>
                </div >

            </div>
            </div>
            </>
        )


}



// class Panel extends PureComponent {
//     constructor(props) {
//         super(props)
        
//         this.state = {

//             toggle: 'Replicate option',
//             walletAddress: "Not connected",
//             status: "",
//             name: "",
//             description: "",
//             url: "",
//             data: [],

//         }

        
//         this.sidebarLinks = [
//             {
//                 id: 1,
//                 border: true,
//                 text: 'Replicate option',
//                 description: 'Start the replication with arbitrary parameters',
//                 active: true,
//             },
//             {
//                 id: 2,
//                 border: true,
//                 text: 'My positions',
//                 description: 'Click to see your previous replications',
//                 active: false,
//             },
//             {
//                 id: 3,
//                 border: true,
//                 text: 'All positions',
//                 description: "Check users' positions close to hedging",
//                 active: false,
//             },
//         ]

//         this.changeToggle = this.changeToggle.bind(this)
//     }

//     connectWalletPressed = async () => { 
//         const walletResponse = await connectWallet();
//         let address = walletResponse.address;

//         if (address) {
//             address = address.slice(0, 7) + "..." + address.slice(-6, );
//         }

//         this.setState({
//             status: walletResponse.status,
//             walletAddress: address
//         });

//   };

    

//     changeToggle(toggle) {
//         this.setState({ toggle })
//     }

        
//     render() {
//         return (
//             <>
//             <Header walletAddress={this.state.walletAddress} connectPressed={this.connectWalletPressed}/>
//             <div className={`${styles['panel-wrapper']}  px-5 `}>
                


//             <div className={`${styles['panel-wrapper']} d-flex`}>
//             <Sidebar 
//                 username={"Your address"}
//                 userAddress={this.state.walletAddress}
//                 userProfile={this.state.walletAddress}
//                 sidebarLinks={this.sidebarLinks}
//                 onChangeToggle={this.changeToggle}
//             />


//                 <div className={`${styles.container} justify-content-center align-items-center p-0`}>
//                     <Row className={`${styles['panel']}  `}>

                        
//                         <div className={`${styles['panel-column']} bg-white border mt-5 mt-md-0  p-5`}>
//                             {this.state.toggle === 'Replicate option' && (
//                                 <UserInformation />
//                             )}
//                             {this.state.toggle === 'My positions' && (
//                                 <UserChangePassword />
//                             )}
//                         </div>
//                     </Row>
//                 </div >

//             </div>
//             </div>
//             </>
//         )
//     }
// }



export default Panel