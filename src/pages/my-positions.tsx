import { Section } from '@/components/layout'
import Table from '@/components/kit/Table'
import MyPositions from '@/views/App/MyPositions/MyPositions'

import { Footer, Header, MobileMenu } from '@/components/layout'

const Home = () => {
  return (
    <>
      <Section>
        <div className='h-10'></div>
        <MyPositions />
      </Section>
    </>
  )
}

export default Home
