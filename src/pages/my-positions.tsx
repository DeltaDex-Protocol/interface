import { Section } from '@/components/layout'
import MyPositions from '@/views/App/MyPositions'

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
