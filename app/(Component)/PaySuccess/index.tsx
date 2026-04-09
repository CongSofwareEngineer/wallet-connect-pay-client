'use client'

import React from 'react'
import { Check } from 'lucide-react'

import ContainerContent from '../ContainerContent'
import Header from '../ContainerContent/Header'
import Div from '../ContainerContent/Div'
import Span from '../ContainerContent/Span'

import { images } from '@/config/images'
import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import useLanguage from '@/hooks/useLanguage'
import useSizePoss from '@/hooks/useSizePoss'

type Props = {
  amount: string
  onBack: () => void
  onNewSale: () => void
}

const PaySuccess = ({ amount, onNewSale, onBack }: Props) => {
  const { translate } = useLanguage()
  const { heightContent } = useSizePoss()

  return (
    <ContainerContent>
      <div className='flex h-full w-full flex-col items-center justify-between text-white'>
        <Header onBack={onBack} />

        <div className='w-full flex items-center flex-1 justify-between flex-col gap-3  bg-[#36AD77] px-1 py-5 rounded-tl-2xl rounded-tr-2xl'>
          {/* Content Section */}
          <MyImage alt='WalletConnect' className='!h-auto !w-[80%]' quality={100} src={images.icons.walletConnectPay} />

          <div className='flex flex-col items-center gap-2'>
            <Div className='  font-medium opacity-90'>{translate('walletConnectPay.paymentSuccessful')}</Div>
            <Div className='   font-bold' style={{ fontSize: 18 }}>
              ${amount}
            </Div>

            <div
              className='flex aspect-square items-center justify-center rounded-full bg-white shadow-xl'
              style={{
                height: heightContent * 0.1,
              }}
            >
              <Check
                className='  text-[#36AD77]'
                strokeWidth={4}
                style={{
                  height: heightContent * 0.05,
                }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className='w-full px-2'>
            <MyButton
              className=' w-full  bg-white p-0  text-lg text-[#1a1c1e] hover:bg-white/95 active:scale-[0.98] transition-all border-none shadow-md'
              onClick={onNewSale}
            >
              <Span className='font-bold'>{translate('walletConnectPay.newSale')}</Span>
            </MyButton>
          </div>
        </div>
      </div>
    </ContainerContent>
  )
}

export default PaySuccess
