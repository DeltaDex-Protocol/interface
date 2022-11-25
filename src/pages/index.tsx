import type { NextPage } from 'next'

import { Footer, Header, MobileMenu } from '@/components/layout'

// import styles from '@/styles/Common.module.scss'

const Home: NextPage = () => {
  return (
    <>
      <div className="all">
        <div className="limiter">
          {/* <Header /> */}
          {/* <Footer /> */}
        </div>
      </div>

      <MobileMenu />
    </>
  )
}

export default Home
