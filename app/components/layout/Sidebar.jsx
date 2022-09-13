import { useState } from 'react'
import {
  SidebarMenuLabels,
  SidebarMenuKeys,
} from '../../configs/sidebar.config'
import SidebarUnit from './SidebarUnit'
import UserAccountSidebar from './SidebarUserUnit'

const Sidebar = ({ walletAddress, activeUnit, setActiveUnit }) => {
  return (
    <div className="mt-10 ">
      <div className="flex md:block overflow-x-auto space-x-4 md:space-x-0">
        <div>
          <UserAccountSidebar walletAddress={walletAddress} />
        </div>
        {SidebarMenuKeys.map((el, index) => {
          return (
            <div className="md:my-4" key={index}>
              <SidebarUnit
                Unit={el}
                setActiveUnit={setActiveUnit}
                activeUnit={activeUnit}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
