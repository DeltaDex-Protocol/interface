import type { NextPage } from 'next'

import { Footer, Header, MobileMenu } from '@/components/layout'

// import styles from '@/styles/Common.module.scss'

import React, { useEffect } from 'react'
import Router from 'next/router'

const Home: NextPage = () => {
  useEffect(() => {
    const { pathname } = Router
    if (pathname == '/') {
      Router.push('/vanilla-options')
    }
  })
  return <>{/* <div className="h-screen"></div> */}</>
}

export default Home
