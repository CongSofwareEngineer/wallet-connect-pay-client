import { BigNumber } from 'bignumber.js'

import fetchConfig from '@/config/fetchConfig'
import { sleep } from '@/utils/functions'

export type InfoPay = {
  paymentId: string
  status: string
  expiresAt: number
  isFinal: boolean
  pollInMs: number
  gatewayUrl: string
}

export type InfoTrackingPayment = 'requires_action' | 'processing' | 'success' | 'succeeded' | 'failed' | 'expired' | 'cancelled'

class PossServices {
  static async createPayment(value: string): Promise<InfoPay> {
    const amount = BigNumber(value).multipliedBy(100).toNumber()
    const characters = 'b240df9bcbc54f4b8fdd14902b63ac8c'
    let referenceId = ''

    for (let i = 0; i < 32; i++) {
      referenceId += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const res = await fetchConfig({
      baseURL: 'https://wallet-connect-pay-client.vercel.app',
      url: `/api/poss`,
      method: 'POST',
      body: {
        referenceId,
        value: amount.toString(),
        endpoint: 'payment',
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
    const res = await fetchConfig({
      baseURL: 'https://wallet-connect-pay-client.vercel.app',
      url: `/api/poss`,
      method: 'POST',
      body: {
        paymentId,
        endpoint: `payment-status`,
      },
    })

    const status = res?.data?.data?.status || res?.data?.status

    if (status === 'processing' || status === 'requires_action') {
      await sleep(2000)
      callback(status)
      await this.trackingPayment(paymentId, callback)
    }

    callback(status)
  }

  static async cancelPayment(paymentId: string): Promise<InfoPay> {
    const res = await fetchConfig({
      baseURL: 'https://wallet-connect-pay-client.vercel.app',
      url: `/api/poss`,
      method: 'POST',
      body: {
        paymentId,
        endpoint: `cancel-payment`,
      },
    })

    return res?.data?.data || res?.data
  }
}
export default PossServices
