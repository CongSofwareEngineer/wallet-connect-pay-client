'use client'

import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { ChevronLeft, X } from 'lucide-react'

import ContainerContent from '../ContainerContent'
import StatusPay from '../StatusPay'
import Header from '../ContainerContent/Header'

import { images } from '@/config/images'
import useCountdown from '@/hooks/useCountdown'
import useSizePoss from '@/hooks/useSizePoss'
import PossServices, { InfoPay } from '@/services/API/poss'

type Props = {
  amount: string
  infoPay: InfoPay
  onBack: () => void
  onClose: () => void
  onSuccess: () => void
}

const QrPay = ({ amount, infoPay, onBack, onClose, onSuccess }: Props) => {
  const { width } = useSizePoss()
  const { formattedTime } = useCountdown(900) // 15 minutes

  const handleCancel = async () => {
    PossServices.cancelPayment(infoPay.paymentId)
    onClose()
  }

  return (
    <ContainerContent>
      <div className='flex flex-col items-center justify-between w-full h-full relative '>
        <Header onBack={() => onBack()} />
        {/* Content Card */}
        <div className='flex bg-[#1e293b]/50 rounded-2xl p-4 flex-col items-center   w-full flex-1 justify-center'>
          <p className='text-slate-400 text-base font-medium'>Scan to pay</p>
          <div className='flex items-baseline mb-4'>
            <span className='text-2xl font-bold text-white mr-1'>$</span>
            <span className='text-2xl font-bold tracking-tight text-white'>{amount}</span>
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
                src: images.icons.walletConnect,
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
            <p className='text-slate-400  '>
              Payment expires in <span className='text-blue-500 font-bold'>{formattedTime}</span>
            </p>
          </div>
          {/* Bottom Close Button */}
          <div className='pb-1 w-full flex flex-1 justify-center items-end'>
            <button
              className='w-10 h-10  p-2 flex items-center justify-center bg-[#1e293b]/80 hover:bg-[#334155]/80 active:scale-90 transition-all rounded-full cursor-pointer border border-slate-700/50 shadow-xl'
              onClick={handleCancel}
            >
              <X className='w-5 h-5 text-slate-400' />
            </button>
          </div>
        </div>
      </div>
    </ContainerContent>
  )
}

export default QrPay
