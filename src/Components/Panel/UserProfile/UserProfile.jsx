// import styles of this component
import styles from './UserProfile.module.css'
// import other pkgs
import { Import } from 'iconsax-react'
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

// var body = document.querySelector('body')
// for(var i = 0; i < 1; i++) {
//   var el = jazzicon(100, Math.round(Math.random() * 10000000))
//   body.appendChild(el)
// }

import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

function jazz () {

  return (
    <Jazzicon diameter={100} seed={jsNumberForAddress('0x1111111111111111111111111111111111111111')} />
  )
}


const UserProfile = ({ userProfile='0x1111111111111111111111111111111111111111', userBirthday, username, userEmail }) => {
    const capitalizeText = (text) => {
        // const firstLetter = text.charAt(0).toUpperCase()
        // const otherLetters = text.slice(1)
        // return `${firstLetter}${otherLetters}`
        return text
    }
    
    // console.log(el)

    return (
        <div className={`${styles['user-profile']} d-flex flex-column align-items-center border bg-white`}>
        <Jazzicon diameter={100} seed={jsNumberForAddress(userBirthday)} />

            <h1 className={`${styles.username} mt-3`}> {capitalizeText(username)} </h1>
            <h4 className={`${styles['user-birthday']} mt-1`}> {userBirthday}</h4>
            <h4 className={`${styles['user-email']} mt-1`}>{capitalizeText(userEmail)}</h4>

        </div>
        // {console.log(jz)}
    )
}

// validate the component
UserProfile.propTypes = {
    userProfile: PropTypes.string,
    username: PropTypes.string.isRequired,
    userBirthday: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
}

export default UserProfile