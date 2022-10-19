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

const navigation: Nav[] = [
  { id: 1, title: 'Vanilla option', path: '/vanilla-options' },
  { id: 2, title: `Impermanent loss\nhedging`, path: '/impermanent-loss' },
  { id: 3, title: 'My positions', path: '/my-positions' },
]

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <div className='flex'>
      {navigation.map(({ id, title, path }) => (
        <Link key={id} href={path}>
          <a className={cx(styles.headerActionLink, pathname === path ? 'text-white' : 'text-[#726DA6]')}>
            {title}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Navbar
