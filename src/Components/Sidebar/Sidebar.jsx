import { useEffect, useRef, useState } from 'react';
import styles from './Sidebar.module.css';
// import UserProfile from '../Panel/UserProfile/UserProfile';
import { Import } from 'iconsax-react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import LinksOfSidebar from './LinksOfSidebar';





const Sidebar = ({username, userAddress, userProfile, sidebarLinks} ) => {

	const sidebarStyle = {
		position: "fixed",
		top: "150px",
		left: "30px",
		height: "100vh",
		width: "190px",
		backgroundColor: "#fff",
}

	return (
		<div style={sidebarStyle}>
			<UserProfile username={username} userAddress={userAddress} userProfile={userProfile} />
			<LinksOfSidebar sidebarLinks={sidebarLinks}/>
		</div>
	);
}




const UserProfile = ({ userProfile='0x1111111111111111111111111111111111111111', userAddress, username, userEmail }) => {

    
    return (
        <div className={`${styles['user-profile']} d-flex flex-column border bg-white`}>
	        
	        <Jazzicon diameter={40} seed={jsNumberForAddress(userProfile)} />

	        <h1 className={`${styles.username} mt-3`}> {(username)} </h1>
	        <h4 className={`${styles['user-birthday']} mt-1`}> {userAddress}</h4>
	        <h4 className={`${styles['user-email']} mt-1`}>{(userEmail)}</h4>

        </div>
    )
}



export default Sidebar;