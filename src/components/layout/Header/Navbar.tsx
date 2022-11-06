import { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cx from 'classnames'
import styles from './Navbar.module.scss'

type Nav = {
  id: number
  title: string
  path: string
}

export const navigation: Nav[] = [
  // { id: 1, title: 'Vanilla options', path: '/vanilla-options' },
  { id: 3, title: 'Leverage Trading', path: '/leverage-trading' },
  { id: 2, title: `Hedge IL\n`, path: '/impermanent-loss' },
  { id: 4, title: 'My positions', path: '/my-positions' },
  { id: 5, title: 'Calculator', path: '/calculator' },
]

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <div className="flex">
      {navigation.map(({ id, title, path }) => (
        <Link key={id} href={path}>
          <a
            className={cx(
              styles.headerActionLink,
              'my-auto',
              pathname === path ? 'text-white' : 'text-[#726DA6]',
            )}
          >
            {title}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Navbar
