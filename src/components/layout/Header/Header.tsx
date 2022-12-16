import { useCallback, useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import Image from 'next/image'

import styles from './Header.module.scss'
// import { socials } from '@/data/socials'
import { Icon } from '@/components/kit'

import { StateContext } from '@/state'
import { WalletContext } from '@viaprotocol/web3-wallets'
import Navbar from './Navbar'
import { HeaderDropDown } from './HeaderDropdown'

// import DeltaDex from '/images/deltadex.svg'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const { connect, isConnected, address } = useContext(WalletContext)

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((state) => !state)
  }, [])

  const { openMobileMenu } = useContext(StateContext)

  useEffect(() => {
    if (window.ethereum) {
      connect({ name: 'MetaMask', chainId: 137 })
    }
  }, [address])

  return (
    <header className={styles.header}>
      <div className={styles.headerLogoContainer}>
        <div className="w-8 max-h-8">
          <Image
            src={'/app/images/deltadex.svg'}
            width={40}
            height={40}
            alt="Builder"
            loading="lazy"
          />
        </div>
        {/* <img
          src="/images/deltadex.svg"
          alt="DeltaDex"
          width={50}
          height={35}
          className="w-8"
        /> */}
        <span className="mb-4 text-[#9FB9FC]">Beta</span>
        <Navbar />
      </div>

      <button
        type="button"
        className={styles.headerBurgerButton}
        onClick={openMobileMenu}
      >
        <img
          src="/app/images/icons/menu-icon.svg"
          alt="Menu icon"
          width="24"
          height="24"
        />
      </button>

      <nav className={cx(styles.headerActions, 'space-x-4')}>
        <button
          className={cx(
            styles.headerActionButton,
            'bg-[#8B5CF6] bg-opacity-30 hover:shadow-md hover:bg-opacity-70',
          )}
        >
          <span className="text-white flex">
            Polygon
            <Icon className="" icon="arrowDown" width={19} height={19} />
          </span>
        </button>
        <button
          onClick={() => connect({ name: 'MetaMask', chainId: 137 })}
          className={cx(
            styles.headerActionButton,
            'bg-[#726DA6] bg-opacity-50 hover:bg-opacity-70 ',
          )}
        >
          <span className="text-white flex">
            {isConnected && address
              ? address?.slice(0, 5) + '..' + address?.slice(address.length - 5)
              : 'Connect'}
          </span>
        </button>

        <HeaderDropDown />

        {/* <button
          onClick={toggleMenu}
          className={cx(
            styles.headerActionButton,
            styles.headerProductsButton,
            isMenuOpen && styles.headerProductsButtonOpened,
          )}
        > */}
        {/* {isMenuOpen ? (
            <Icon icon="close" className="mt-1" />
          ) : (
            <span>Products</span>
          )} */}
        {/* </button> */}
        {/* <div
          className={cx(
            styles.headerProducts,
            isMenuOpen && styles.headerProductsOpened,
          )}
        >
          <ul className={styles.headerProductsList}>
            <li className={styles.menuProduct}>
              <a
                href="https://router.via.exchange/"
                className={styles.menuProductWrapper}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.menuProductImageWrapper}>
                  <img
                    className={styles.menuProductImage}
                    width="24"
                    height="24"
                    src="/images/icons/router.svg"
                    alt="Cross-chain Aggregation Protocol"
                  />
                </div>
                <div className={styles.menuProductInfo}>
                  <h4 className={styles.menuProductTitle}>
                    Cross-chain Aggregation Protocol
                  </h4>
                  <p className={styles.menuProductDescription}>
                    The best router for any-to-any cross-chain swaps
                  </p>
                </div>
              </a>
            </li>
            <li className={styles.menuProduct}>
              <a
                href="https://github.com/viaprotocol/via-sdk-js"
                className={styles.menuProductWrapper}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.menuProductImageWrapper}>
                  <img
                    className={styles.menuProductImage}
                    width="24"
                    height="24"
                    src="/images/icons/api.svg"
                    alt="API"
                  />
                </div>
                <div className={styles.menuProductInfo}>
                  <h4 className={styles.menuProductTitle}>SDK</h4>
                  <p className={styles.menuProductDescription}>
                    Access to multi-chain for wallets, games and marketplaces
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div> */}
      </nav>
    </header>
  )
}

export { Header }
