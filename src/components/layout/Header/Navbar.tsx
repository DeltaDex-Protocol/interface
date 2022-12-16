import { useRouter } from 'next/router'
import Link from 'next/link'
import cx from 'classnames'
import styles from './Navbar.module.scss'

export type Nav = {
  id: number
  title: string
  path: string
}

export const navigation: Nav[] = [
  { id: 1, title: 'Vanilla options', path: '/vanilla-options' },
  // { id: 3, title: 'Leverage Trading', path: '/app/leverage-trading' },
  // { id: 2, title: `Hedge IL\n`, path: '/app/impermanent-loss' },
  { id: 4, title: 'My positions', path: '/my-positions' },
  { id: 5, title: 'Position builder', path: '/calculator' },
]

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <div className="flex">
      {navigation.map(({ id, title, path }) => (
        (<Link
          key={id}
          href={path}
          className={cx(
            styles.headerActionLink,
            'my-auto',
            pathname === path ? 'text-white' : 'text-[#726DA6]',
          )}>

          {title}

        </Link>)
      ))}
    </div>
  );
}

export default Navbar
