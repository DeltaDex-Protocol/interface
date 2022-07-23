import { useState } from 'react'

// import styles of this component
import styles from './LinksOfSidebar.module.css'

const LinksOfSidebar = ({sidebarLinks, onChangeToggle}) => {

	const [linkState, setLinkState] = useState({
		links: [...sidebarLinks],
	})

	const activeLink = () => {
		console.log('pass');
	}


	return (
		<>
			<div className={`${styles["link-sidebar"]}`}>
				<h1 className={`${styles["title"]} mt-3`}> Replicate option </h1>
				<h2 className={`${styles["description"]} mt-3`} >
				Start the replication with arbitrary parameters</h2>
			</div>

			<div className={`${styles["link-sidebar"]}`}>
				<h1 className={`${styles["title"]} mt-3`}> My positions</h1>
				<h2 className={`${styles["description"]} mt-3`} >
				Click to see your previous replications</h2>
			</div>

			<div className={`${styles["link-sidebar"]}`}>
				<h1 className={`${styles["title"]} mt-3`}> All positions</h1>
				<h2 className={`${styles["description"]} mt-3`} >
				Check users' positions close to hedging</h2>			
			</div>

		</>
		);

};

export default LinksOfSidebar;