import Button from "../shared/Button";
import displayAddress from "../../utils/displayAddress";
import Logo from '../../components/shared/Logo.jsx'


const Header = ({walletAddress, connect}) => {
    
    return (
        <div className="sticky top-0 flex justify-between z-10 ">
            <div className="flex h-10 space-x-6 mt-4">
                <Logo />
                <Button value={'Tutorial'} onClick={()=>{alert()}}/>
            </div>
            <div className="mt-4">
                <Button value={displayAddress(walletAddress)}
                        onClick={connect}/>
            </div>
        </div>
    );
};

export default Header;