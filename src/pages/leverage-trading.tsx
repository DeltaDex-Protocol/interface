import LeverageForm from '@/views/App/LeverageTrading/LeverageTrading'
import { Section } from '@/components/layout'
import styles from 'src/views/App/ImpermanentLoss/IL.module.scss'
import { LeverageTradingFormContextProvider } from '@/context/form/LeverageTradingContext'


const Home = () => {
  return (
    <>
      <LeverageTradingFormContextProvider>
        <Section>
          <div className="mx-auto max-w-[500px]">
            {/* <div className="h-5"></div> */}
            <h2 className={styles['title-app']}>
              Trade with up to
              <br />
              x5 leverage
              <br />
            </h2>
            <div className="h-5"></div>
            <LeverageForm className={styles.repform} />
          </div>
        </Section>
      </LeverageTradingFormContextProvider>
    </>
  )
}

export default Home
