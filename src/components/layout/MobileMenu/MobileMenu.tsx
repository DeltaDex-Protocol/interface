import cx from 'classnames'
import { useContext } from 'react'

import { StateContext } from '@/state'
import { Icon } from '@/components/kit'

function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useContext(StateContext)

  return (
    <section
      className={cx('mobile-menu', isMobileMenuOpen && 'mobile-menu--opened')}
    >
      <header className="mobile-menu__header">
        <button
          type="button"
          className="mobile-menu__close"
          onClick={closeMobileMenu}
        >
          <Icon icon="close" />
        </button>

        {/* <a href="" className="mobile-menu__docs" target="_blank" rel="noopener noreferrer">
          <span>Via Docs</span>
          <img src="/images/icons/external.svg" alt="External link" width="16" height="16" />
        </a> */}
      </header>

      {/* <h3 className="mobile-menu__title">DeltaDex</h3> */}

      <ul className="mobile-menu__products mb-10">
        <li className="mobile-menu__product menu-product">
          <a
            href="/"
            className="menu-product__wrapper"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <div className="menu-product__info">
              <h4 className="menu-product__title">DeltaDex</h4>
              <p className="menu-product__description">
                Next-generation decentralized options contract protocol
              </p>
            </div>
          </a>
        </li>
        <li className="mobile-menu__product menu-product">
          <a
            href={'/app/vanilla-options'}
            className="menu-product__wrapper"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <div className="menu-product__info">
              <h4 className="menu-product__title">Options replication</h4>
              <p className="menu-product__description">
                Earn more LP fees with options replication
              </p>
            </div>
          </a>
        </li>
        <li className="mobile-menu__product menu-product">
          <a
            href={'/app/my-positions'}
            className="menu-product__wrapper"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <div className="menu-product__info">
              <h4 className="menu-product__title">My positions</h4>
              <p className="menu-product__description">
                View your current positions
              </p>
            </div>
          </a>
        </li>
        <li className="mobile-menu__product menu-product">
          <a
            href={'/app/calculator'}
            className="menu-product__wrapper"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <div className="menu-product__info">
              <h4 className="menu-product__title">Position builder</h4>
              <p className="menu-product__description">
                Build your own strategy to hedge IL
              </p>
            </div>
          </a>
        </li>
        {/* <li className="mobile-menu__product menu-product">
          <a
            href={'/app/leverage-trading'}
            className="menu-product__wrapper"
            // target="_blank"
            rel="noopener noreferrer"
          >
            <div className="menu-product__info">
              <h4 className="menu-product__title">On-chain leverage trading</h4>
              <p className="menu-product__description">
                Run on-chain trading with up to x5 leverage
              </p>
            </div>
          </a>
        </li> */}
      </ul>
      {/* <ul className="mobile-menu__socials">
        <li>
          <a className="mobile-menu__social-link" href="https://gitcoin.co/grants/4665/via-protocol" target="_blank" rel="noopener noreferrer">
            <Icon icon="gitcoin" width={24} height={24} />
            <span className="visually-hidden">Gitcoin</span>
          </a>
        </li>
        <li>
          <a className="mobile-menu__social-link" href="https://github.com/viaprotocol" target="_blank" rel="noopener noreferrer">
            <Icon icon="github" width={24} height={24} />
            <span className="visually-hidden">Github</span>
          </a>
        </li>
        <li>
          <a className="mobile-menu__social-link" href="https://discord.gg/viaexchange" target="_blank" rel="noopener noreferrer">
            <Icon icon="discord" width={24} height={24} />
            <span className="visually-hidden">Discord</span>
          </a>
        </li>
        <li>
          <a className="mobile-menu__social-link" href="https://twitter.com/via_protocol" target="_blank" rel="noopener noreferrer">
            <Icon icon="twitter" width={24} height={24} />
            <span className="visually-hidden">Twitter</span>
          </a>
        </li>
        <li>
          <a className="mobile-menu__social-link" href="https://medium.com/via-exchange" target="_blank" rel="noopener noreferrer">
            <Icon icon="medium" width={24} height={24} />
            <span className="visually-hidden">Medium</span>
          </a>
        </li>
        <li>
          <a className="mobile-menu__social-link" href="https://guild.xyz/via" target="_blank" rel="noopener noreferrer">
            <Icon icon="guild" width={24} height={24} />
            <span className="visually-hidden">Medium</span>
          </a>
        </li>
      </ul> */}
    </section>
  )
}

export { MobileMenu }
