import { NextRequest } from 'next/server'

import fetchConfig from '@/config/fetchConfig'

const baseURL = 'https://pos-demo.walletconnect.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const endpoint = body.endpoint
    const payload = {
      referenceId: body.referenceId,
      amount: {
        value: body.value,
        unit: 'iso4217/USD',
      },
    }

    let result

    switch (endpoint) {
      case 'payment':
        result = await fetchConfig({
          baseURL,
          url: '/api/payment',
          method: 'POST',
          body: payload,
        })
        break

      default:
        break
    }

    return Response.json({ ...result })
  } catch (error) {
    return Response.json({ error: 'Lỗi mã hóa' }, { status: 500 })
  }
}
