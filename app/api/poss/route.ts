import { NextRequest } from 'next/server'

import fetchConfig from '@/config/fetchConfig'
import { POSS_CONFIG } from '@/config/poss'

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

    const request: any = {
      baseURL,
      body: payload,
      headers: {
        origin: 'https://pos-demo.walletconnect.com',
      },
    }

    switch (endpoint) {
      case 'payment':
        request.url = '/api/payment'
        request.method = 'POST'
        break

      case 'payment-status':
        request.url = `/api/payment-status?paymentId=${body.paymentId}`
        request.method = 'GET'
        break

      default:
        break
    }
    console.log({ request, POSS_CONFIG })

    result = await fetchConfig(request)

    return Response.json({ ...result })
  } catch (error) {
    return Response.json({ error: 'Lỗi mã hóa' }, { status: 500 })
  }
}
