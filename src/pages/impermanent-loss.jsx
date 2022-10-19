import Form from 'src/views/App/ImpermanentLoss/Form.jsx'
import { Section } from '@/components/layout'
import styles from 'src/views/App/ImpermanentLoss/IL.module.scss'

import { Footer, Header, MobileMenu } from '@/components/layout'

const Home = () => {
  return (
    <>
      <div className="all">
        <div className="limiter">
          <Header />

          <main>
            <Section>
              <div className="mx-auto max-w-[500px]">
                <h2 className={styles['title-app']}>
                  Hedge against
                  <br />
                  Impermanent Loss
                </h2>

                <div className="h-5"></div>
                <Form className={styles.repform} />
              </div>
            </Section>
          </main>

          {/* <Footer /> */}
        </div>
      </div>

      <MobileMenu />
    </>
  )
}

export default Home
