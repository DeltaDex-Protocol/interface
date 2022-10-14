import { Section } from '@/components/layout'
import { Routes } from './components/Routes'
import styles from './Demo.module.scss'
import Form from 'src/views/App/ImpermanentLoss/Form'

function Demo() {
  return (
    <Section>
      <div className='mx-auto max-w-[00px]'>
        {/* <h2 className={styles['title-app']}>Hedge against<br />Impermanent Loss</h2>
        <div className='h-5'></div>
        <Form className={styles.repform} /> */}
      </div>
    </Section>
  )
}

export { Demo }
