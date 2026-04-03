import { NextRequest } from 'next/server'

import fetchConfig from '@/config/fetchConfig'
import { POSS_CONFIG } from '@/config/poss'

const baseURL = 'https://pos-demo.walletconnect.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
}

export async function OPTIONS() {
  return Response.json({}, { headers: corsHeaders })
}

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
      headers: {
        origin: 'https://pos-demo.walletconnect.com',
      },
    }

    switch (endpoint) {
      case 'payment':
        request.url = '/api/payment'
        request.method = 'POST'
        request.body = payload
        break

      case 'payment-status':
        request.url = `/api/payment-status?paymentId=${body.paymentId}`
        request.method = 'GET'
        break

      case 'cancel-payment':
        request.url = `/api/cancel-payment?paymentId=${body.paymentId}`
        request.method = 'POST'
        request.body = {
          paymentId: body.paymentId,
        }
        break
      case 'transactions':
        request.url = `/api/transactions?`
        request.method = 'GET'
        delete body.endpoint

        Object.keys(body).forEach((key, index) => {
          request.url += `${key}=${body[key]}${index === Object.keys(body).length - 1 ? '' : '&'}`
        })

        break

      default:
        break
    }
    console.log({ request, POSS_CONFIG })

    result = await fetchConfig(request)

    return Response.json({ ...result }, { headers: corsHeaders })
  } catch (error) {
    return Response.json({ error: 'Lỗi mã hóa' }, { status: 500, headers: corsHeaders })
  }
}
