import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import displayAddress from '../../utils/displayAddress'


const UserAccountSidebar = ({ walletAddress }) => {
    return (
      <div className="relative rounded-xl bg-gray-100 shadow  py-12 px-20 flex flex-col ">
        <div className="flex absolute left-3 top-4 ">
          <span className="text-black font-medium  text-base w-10 mr-12 leading-tight">
            Your address
          </span>
          <Jazzicon
            className=""
            diameter={36}
            seed={jsNumberForAddress("0x11111111")}
          />
        </div>
        <span className="absolute left-3 top-16  text-sm">
          {displayAddress(walletAddress)}
        </span>
      </div>
    );
};

export default UserAccountSidebar;