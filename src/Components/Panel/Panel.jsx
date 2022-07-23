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


class Panel extends PureComponent {
    constructor(props) {
        super(props)
        this.myVerifyUser = this.getUserFromStorage()
        
        this.state = {
            user: {...this.initState(this.myVerifyUser)},
            toggle: 'Replicate option',
            walletAddress: "Not connected",
            status: "",
            name: "",
            description: "",
            url: "",

        }

        
        this.sidebarLinks = [
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

        this.logOut = this.logOut.bind(this)
        this.changeToggle = this.changeToggle.bind(this)
        this.changeUserInformation = this.changeUserInformation.bind(this)
    }

    connectWalletPressed = async () => { 
        const walletResponse = await connectWallet();
        let address = walletResponse.address;

        if (address) {
            address = address.slice(0, 7) + "..." + address.slice(-6, );
        }

        this.setState({
            status: walletResponse.status,
            walletAddress: address
        });

  };



    getUserFromStorage() {
        const users = getStorage('users')
        const userId = getStorage('id')
        const myVerifyUser = users.find(user => user.id === userId)
        
        return myVerifyUser
    }

    initState({ id, username, email, birthday, password, isLogin, firstName, lastName }) {
        return ({ id, username, email, birthday, password, firstName, lastName, isLogin, })
    }

    logOut() {
        this.changeUserInformation(['isLogin'], [false])
    }

    componentDidUpdate() {

        // func().then( () => {

        // updateStorage(getStorage('users'), this.state.user)
        // !this.state.user.isLogin && this.props.onLogOut()
    // }
}

    changeToggle(toggle) {
        this.setState({ toggle })
    }



    changeUserInformation(keyInfos, valInfos) {
        let newInfo = {}
        
        keyInfos.forEach((keyInfo, idx) => (
            newInfo[keyInfo] = valInfos[idx]
        ))

        this.setState(prev => {
            return {
                user: {
                    ...prev.user,
                    ...newInfo,
                }
            }
        })
    }
        
    render() {
        return (
            <>
            <Header walletAddress={this.state.walletAddress} connectPressed={this.connectWalletPressed}/>
            <div className={`${styles['panel-wrapper']}  px-5 `}>
                

{/*                <Button variant="primary" className="float-end mt-5 py-2" onClick={this.connectWalletPressed}> 
                    {this.state.walletAddress !== "Not connected" ? (
                      "Connected: " +
                      String(this.state.walletAddress).substring(0, 6) +
                      "..." +
                      String(this.state.walletAddress).substring(38)
                    ) : (
                      <span>Connect Wallet</span>
                    )}
                </Button>*/}

            <div className={`${styles['panel-wrapper']} d-flex`}>
            <Sidebar 
                username={"Your address"}
                userAddress={this.state.walletAddress}
                userProfile={this.state.walletAddress}
                sidebarLinks={this.sidebarLinks}
                onChangeToggle={this.changeToggle}
            />
                

                <div className={`${styles.container} justify-content-center align-items-center p-0`}>
                    <Row className={`${styles['panel']}  `}>
                        {/*<Col xs={12} sm={8} md={4} className="d-flex flex-column justify-content-center p-0">
                            <UserCard
                                username={"Your address"} 
                                userBirthday={this.state.walletAddress} 
                                sidebarLinks={this.sidebarLinks}
                                onChangeToggle={this.changeToggle}
                            />
                        </Col>*/}
                        
                        <div className={`${styles['panel-column']} bg-white border mt-5 mt-md-0  p-5`}>
                            {this.state.toggle === 'Replicate option' && (
                                <UserInformation 
                                    username={this.state.user.username}
                                    firstName={this.state.user.firstName}
                                    lastName={this.state.user.lastName}
                                    email={this.state.user.email} 
                                    birthday={this.state.user.birthday} 
                                    onChangeInfo={this.changeUserInformation}
                                />
                            )}
                            {this.state.toggle === 'My positions' && (
                                <UserChangePassword 
                                    password={this.state.user.password}
                                    onChangeInfo={this.changeUserInformation} 
                                />
                            )}
                        </div>
                    </Row>
                </div >

            </div>
            </div>
            </>
        )
    }
}



export default Panel