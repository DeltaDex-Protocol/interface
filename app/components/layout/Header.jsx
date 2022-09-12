import Button from "../shared/Button"
import displayAddress from "../../utils/displayAddress"
import Logo from '../../components/shared/Logo.jsx'


const Header = ({walletAddress, connect}) => {

    const goToLink = () => {
        const url = 'https://medium.com/@deltadexprotocol/how-to-create-an-option-contract-on-deltadex-rinkeby-testnet-tutorial-4621004c521f'
        window.open(url, '_blank')
    }
    
    return (
        <div className="sticky top-0 flex justify-between z-10 ">
            <div className="flex h-10 space-x-6 mt-4">
                <Logo />
                <Button value={'Tutorial'} onClick={goToLink}/>
            </div>
            <div className="mt-4">
                <Button value={displayAddress(walletAddress)}
                        onClick={connect}/>
            </div>
        </div>
    );
};

export default Header;