import Form from '@/views/App/ImpermanentLoss'
import { Section } from '@/components/layout'
import styles from 'src/views/App/ImpermanentLoss/IL.module.scss'
import { OptionFormContextProvider } from '@/context/form/OptionFormContext'

const Home = () => {
  return (
    <>
      <OptionFormContextProvider>
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
      </OptionFormContextProvider>
    </>
  )
}

export default Home
