import { Section } from '@/components/layout'
import { Routes } from './components/Routes'
import styles from './Demo.module.scss'
import Form from 'src/views/App/ImpermanentLoss/Form'

function Demo() {
  return (
    <Section>
      <div className='mx-auto max-w-[500px]'>
        <h2 className={styles['title-app']}>Hedge against<br />Impermanent Loss</h2>
        {/* <p className={styles.description}>
          <span>Be sure that you will make a<br/>cross-chain transfer in the<br/>most efficient and safe way</span>
          <a href="https://router.via.exchange/" target="_blank" rel="noopener norefferer noreferrer" className={styles.button}>Open</a>
        </p> */}
        <div className='h-5'></div>
        <Form className={styles.repform} />
      </div>
    </Section>
  )
}

export { Demo }
