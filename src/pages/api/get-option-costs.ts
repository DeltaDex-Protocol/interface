import type { NextApiRequest, NextApiResponse } from 'next'
import { BSvanillaPut } from '@/privateUtils/BSvanillaPut'

// http://localhost:3000/api/get-option-costs?currentPrice=1550&strike=1600&expiry=30&riskFree=0.1&volatility=0.7&contractAmount=1.2

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>,
) {
  let data = req.query

  console.log(data)
  try {
    return BSvanillaPut(data).then((cost) => res.status(200).json(cost))
  } catch {
    res.status(400) // seems it has no effect
  }
}
