import LeverageForm from '@/views/App/LeverageTrading/LeverageTrading'
import { Section } from '@/components/layout'
import styles from 'src/views/App/ImpermanentLoss/IL.module.scss'
import Table from '@/components/kit/Table'

import { Footer, Header, MobileMenu } from '@/components/layout'

const Home = () => {
  return (
    <>
      <main>
        <Section>
          <div className="mx-auto max-w-[500px]">
            <h2 className={styles['title-app']}>
              5x Leverage 
              <br />
              
            </h2>
            <div className="h-5"></div>
            <LeverageForm className={styles.repform} />
          </div>
        </Section>
      </main>
      {/* <MobileMenu /> */}
    </>
  )
}

export default Home
