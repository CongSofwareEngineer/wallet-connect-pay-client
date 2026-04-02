import fetchConfig from '@/config/fetchConfig'

class PossServices {
  static async createPayment(value: string) {
    const amount = Number(value) * 100
    const referenceId = crypto.randomUUID().slice(0, 35)
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
  }
}
export default PossServices
