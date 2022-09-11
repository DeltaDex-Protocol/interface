import { useState } from 'react'
import SidebarUnit from "./SidebarUnit"
import displayAddress from '../../utils/displayAddress'
import { SidebarMenuLabels } from '../../configs/Sidebar'


const UserAccountSidebar = ({ walletAddress }) => {
    return (
      <div className="relative rounded-xl bg-white shadow  py-12 px-20 flex flex-col ">
        <div className="flex absolute left-3 top-4 ">
          <span className="text-black font-medium  text-base w-10 mr-12 leading-tight">
            Your address
          </span>
          {/* <Jazzicon
            className=""
            diameter={36}
            seed={jsNumberForAddress("0x11111111")}
          /> */}
        </div>
        <span className="absolute left-3 top-16  text-sm">
          {displayAddress(walletAddress)}
        </span>
      </div>
    );
  };
  
  


const Sidebar = ({walletAddress}) => {
    const [toggle, setToggle] = useState('')
    console.log(SidebarMenuLabels)

    return (
        <div className="mt-10 w-10">
            <UserAccountSidebar walletAddress={walletAddress} />

            {SidebarMenuLabels.map((el, index) => 
                <SidebarUnit key={index}
                    Menu={el}
                    onChangeToggle={setToggle}
                    toggle={toggle} />
                )}
        </div>
    )
}

export default Sidebar;