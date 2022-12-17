import { Section } from '@/components/layout'
import RecieveTokens from '@/views/App/testnet/getTokens'


import React from 'react'

const getTokens = () => {
  return (
    <Section>
        <RecieveTokens />
    </Section>
  )
}

export default getTokens