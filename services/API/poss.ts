import { BigNumber } from 'bignumber.js'

import fetchConfig from '@/config/fetchConfig'
import { sleep } from '@/utils/functions'
import PossUtils from '@/utils/poss'
export type InfoTrackingPayment = 'requires_action' | 'processing' | 'success' | 'succeeded' | 'failed' | 'expired' | 'cancelled'

export type InfoPay = {
  paymentId: string
  status: InfoTrackingPayment
  expiresAt: number
  isFinal: boolean
  pollInMs: number
  gatewayUrl: string
}

const config: any = {}

if (process.env.NEXT_PUBLIC_ENV === 'development') {
  config.baseURL = 'https://wallet-connect-pay-client.vercel.app'
}

class PossServices {
  static isStopTracking = false
  static async createPayment(value: string): Promise<InfoPay> {
    const amount = BigNumber(value).multipliedBy(100).toNumber()
    const characters = 'b240df9bcbc54f4b8fdd14902b63ac8c'
    let referenceId = ''

    for (let i = 0; i < 32; i++) {
      referenceId += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const res = await fetchConfig({
      ...config,
      url: `/api/poss`,
      method: 'POST',
      body: {
        referenceId,
        value: amount.toString(),
        endpoint: 'payment',
        chainType: PossUtils.chainType,
      },
    })

    return res?.data?.data || res?.data
    // return {
    //   paymentId: 'pay_4ca2ecc101KN67MJRFT0H344AKF8JHJS4C',
    //   status: 'requires_action',
    //   expiresAt: 1775105476,
    //   isFinal: false,
    //   pollInMs: 1000,
    //   gatewayUrl: 'https://pay.walletconnect.com/?pid=pay_4ca2ecc101KN67MJRFT0H344AKF8JHJS4C',
    // }
  }

  static async trackingPayment(paymentId: string, callback: (status: InfoTrackingPayment) => void): Promise<void> {
    let isContinue = true
    let status: InfoTrackingPayment = 'requires_action'

    while (isContinue) {
      const res = await fetchConfig({
        ...config,
        url: `/api/poss`,
        method: 'POST',
        body: {
          paymentId,
          endpoint: `payment-status`,
          chainType: PossUtils.chainType,
        },
      })

      status = res?.data?.data?.status || res?.data?.status
      callback(status)

      if (PossServices.isStopTracking) {
        isContinue = false

        break
      }

      if (status === 'processing' || status === 'requires_action') {
        await sleep(2000)
      } else {
        isContinue = false
      }
    }
  }

  static async cancelPayment(paymentId: string): Promise<InfoPay> {
    const res = await fetchConfig({
      ...config,
      url: `/api/poss`,
      method: 'POST',
      body: {
        paymentId,
        endpoint: `cancel-payment`,
        chainType: PossUtils.chainType,
      },
    })

    return res?.data?.data || res?.data
  }

  static async getTransactions(params: any): Promise<any> {
    const res = await fetchConfig({
      ...config,
      url: `/api/transactions`,
      method: 'GET',
      body: params,
    })

    return res?.data?.data || res?.data
  }
}
export default PossServices
