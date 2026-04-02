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

export type InfoTrackingPayment = 'requires_action' | 'processing' | 'succeeded' | 'failed' | 'expired' | 'cancelled'

class PossServices {
  static async createPayment(value: string): Promise<InfoPay> {
    const amount = BigNumber(value).multipliedBy(100).toNumber()
    const characters = 'b240df9bcbc54f4b8fdd14902b63ac8c'
    let referenceId = ''

    for (let i = 0; i < 32; i++) {
      referenceId += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    const res = await fetchConfig({
      url: `/api/poss`,
      method: 'POST',
      body: {
        referenceId,
        value: amount.toString(),
        endpoint: 'payment',
      },
    })

    return res?.data
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
      url: `/api/poss`,
      method: 'POST',
      body: {
        paymentId,
        endpoint: `payment-status`,
      },
    })

    if (res?.data?.status === 'processing' || res?.data?.status === 'requires_action') {
      await sleep(2000)
      callback(res?.data?.status)
      await this.trackingPayment(paymentId, callback)
    }

    callback(res?.data?.status)
  }
}
export default PossServices
