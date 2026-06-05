import { NextRequest } from 'next/server'

import fetchConfig from '@/config/fetchConfig'
import { POSS_CONFIG } from '@/config/poss'
import PossUtils from '@/utils/poss'
import { TYPE_CURRENCY } from '@/app/page'
import { encryptData, decryptData } from '@/utils/crypto'

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
    const chainType = body.chainType
    const currency = body.currency as TYPE_CURRENCY
    const url = req.url

    console.log({ url })

    delete body.chainType
    delete body.endpoint
    let result

    const apiKey = decryptData(process.env.API_KEY || 'nokey', 'bacoor')

    const request: any = {
      baseURL,
      headers: {
        origin: 'https://pos-demo.walletconnect.com',
        'x-api-key': apiKey,
        'x-merchant-id': PossUtils.getMerchantIdByChain(chainType),
      },
    }

    const unit = currency === 'USD' ? 'iso4217/USD' : 'iso4217/EUR'

    switch (endpoint) {
      case 'payment':
        request.url = '/api/payment'
        request.method = 'POST'
        request.body = {
          referenceId: body.referenceId,
          amount: {
            value: body.value,
            unit,
          },
        }
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

        Object.keys(body).forEach((key, index) => {
          request.url += `${key}=${body[key]}${index === Object.keys(body).length - 1 ? '' : '&'}`
        })

        break

      default:
        break
    }

    // return Response.json({ ...request, apiKeyEncode }, { headers: corsHeaders })

    result = await fetchConfig(request)

    return Response.json({ ...result }, { headers: corsHeaders })
  } catch (error) {
    return Response.json({ error: 'Lỗi mã hóa' }, { status: 500, headers: corsHeaders })
  }
}
