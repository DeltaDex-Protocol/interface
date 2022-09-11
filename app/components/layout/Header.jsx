import Button from "../shared/Button";
import shortenAddress from "../../utils/shortenAddress";
// import logo from '/logo.png';
import Logo from '../../components/shared/Logo.jsx'


const Header = ({ walletAddress, connectPressed }) => {
    return (
        <div className="sticky mt-4 top-0 flex justify-between z-10 mx-10">
            <div className="flex h-10 space-x-10 ">
                <Logo />
                <Button value={'Tutorial'} onClick={()=>{alert()}}/>
            </div>

            <Button value={shortenAddress('0x42e47b0eB2df592890cf620027e8bf6F52adbAAD')}
                    onClick={connectPressed}/>

        </div>
    );
};

export default Header;