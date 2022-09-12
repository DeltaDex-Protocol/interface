import { useState } from 'react'
import { SidebarMenuLabels, SidebarMenuKeys } from '../../configs/Sidebar'
import SidebarUnit from "./SidebarUnit"
import UserAccountSidebar from './SidebarUserUnit'
    


const Sidebar = ({walletAddress, activeUnit, setActiveUnit}) => {

    return (
        <div className="mt-10 w-10">
            <UserAccountSidebar walletAddress={walletAddress} />
            {/* {console.log(SidebarMenuLabels)} */}
            {SidebarMenuKeys.map((el, index) => {
                return <SidebarUnit key={index}
                            Unit={el}
                            setActiveUnit={setActiveUnit}
                            activeUnit={activeUnit} />
                }
            )}
        </div>
    )
}

export default Sidebar;