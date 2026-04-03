'use client'

import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { ChevronLeft, X } from 'lucide-react'

import ContainerContent from '../ContainerContent'
import StatusPay from '../StatusPay'
import Header from '../ContainerContent/Header'
import Div from '../ContainerContent/Div'
import Span from '../ContainerContent/Span'

import { images } from '@/config/images'
import useCountdown from '@/hooks/useCountdown'
import useSizePoss from '@/hooks/useSizePoss'
import useLanguage from '@/hooks/useLanguage'
import PossServices, { InfoPay } from '@/services/API/poss'

type Props = {
  amount: string
  infoPay: InfoPay
  onBack: () => void
  onClose: () => void
  onSuccess: () => void
}

const QrPay = ({ amount, infoPay, onBack, onClose, onSuccess }: Props) => {
  const { translate } = useLanguage()
  const { width } = useSizePoss()
  const { formattedTime } = useCountdown(900) // 15 minutes

  const handleCancel = async () => {
    PossServices.isStopTracking = true
    PossServices.cancelPayment(infoPay.paymentId)
    onClose()
  }

  const handleBack = async () => {
    PossServices.isStopTracking = true
    PossServices.cancelPayment(infoPay.paymentId)
    onBack()
  }

  return (
    <ContainerContent>
      <div className='flex flex-col items-center justify-between w-full h-full relative '>
        <Header onBack={() => handleBack()} />
        {/* Content Card */}
        <div className='flex bg-[#1e293b]/50 rounded-tl-2xl rounded-tr-2xl p-4 flex-col items-center   w-full flex-1 justify-center'>
          <Div className='text-slate-400  font-medium'>{translate('walletConnectPay.scanToPay')}</Div>
          <div className='flex items-baseline mb-4'>
            <Span className='font-bold text-white mr-1' style={{ fontSize: 16 }}>
              $
            </Span>
            <Span className='font-bold tracking-tight text-white' style={{ fontSize: 16 }}>
              {amount}
            </Span>
          </div>

          <div className='relative bg-white p-2 rounded-[6px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]  '>
            <StatusPay infoPay={infoPay} onSuccess={onSuccess} />
            <QRCodeCanvas
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"H"}
              size={width * 0.5}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={infoPay.gatewayUrl}
              imageSettings={{
                src: images.icons.iconWalletConnect,
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            // viewBox={`0 0 256 256`}
            />
          </div>

          <div className='flex flex-col items-center gap-1 mt-6'>
            <Span className='text-slate-400  '>
              {translate('walletConnectPay.paymentExpiresIn')} <Span className='text-blue-500 font-bold'>{formattedTime}</Span>
            </Span>
          </div>
          {/* Bottom Close Button */}
          <div className='pb-1 w-full flex flex-1 justify-center items-end'>
            <button
              className=' flex items-center justify-center bg-[#1e293b]/80 hover:bg-[#334155]/80 active:scale-90 transition-all rounded-full cursor-pointer border border-slate-700/50 shadow-xl'
              style={{
                padding: width * 0.03,
              }}
              onClick={handleCancel}
            >
              <X
                className='  text-slate-400'
                style={{
                  width: width * 0.05,
                  height: width * 0.05,
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </ContainerContent>
  )
}

export default QrPay
