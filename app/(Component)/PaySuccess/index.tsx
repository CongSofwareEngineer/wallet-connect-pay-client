'use client'

import React from 'react'
import { Check } from 'lucide-react'

import ContainerContent from '../ContainerContent'
import Header from '../ContainerContent/Header'

import { images } from '@/config/images'
import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import useLanguage from '@/hooks/useLanguage'

type Props = {
  amount: string
  onBack: () => void
  onNewSale: () => void
}

const PaySuccess = ({ amount, onNewSale, onBack }: Props) => {
  const { translate } = useLanguage()

  return (
    <ContainerContent>
      <div className='flex h-full w-full flex-col items-center justify-between text-white'>
        <Header onBack={onBack} />

        <div className='w-full flex items-center flex-1 justify-between flex-col gap-3  bg-[#36AD77] px-1 py-5 rounded-tl-2xl rounded-tr-2xl'>
          {/* Content Section */}
          <MyImage alt='WalletConnect' className='!h-auto !w-[80%]' quality={100} src={images.icons.walletConnectPay} />

          <div className='flex flex-col items-center gap-2'>
            <p className='text-lg font-medium opacity-90'>{translate('walletConnectPay.paymentSuccessful')}</p>
            <h2 className='text-3xl font-bold'>${amount}</h2>

            <div className='flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xl'>
              <Check className='h-8 w-8 text-[#36AD77]' strokeWidth={4} />
            </div>
          </div>

          {/* Action Button */}
          <div className='w-full px-2'>
            <MyButton
              className=' w-full   bg-white p-0  text-lg text-[#1a1c1e] hover:bg-white/95 active:scale-[0.98] transition-all border-none shadow-md'
              onClick={onNewSale}
            >
              {translate('walletConnectPay.newSale')}
            </MyButton>
          </div>
        </div>
      </div>
    </ContainerContent>
  )
}

export default PaySuccess
