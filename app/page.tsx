'use client'

import { useState } from 'react'

import EnterPay from './(Component)/EnterPay'
import EnterAmount from './(Component)/EnterAmount'
import PaySuccess from './(Component)/PaySuccess'
import QrPay from './(Component)/QrPay'

import MyImage from '@/components/MyImage'
import { images } from '@/config/images'
import useSizePoss from '@/hooks/useSizePoss'
import useSizeScreen from '@/hooks/useSizeScreen'
import { cn } from '@/utils/tailwind'
import { InfoPay } from '@/services/API/poss'
import useMedia from '@/hooks/useMedia'
type Step = 'enter-pay' | 'enter-pin' | 'enter-amount' | 'qr' | 'success' | 'history'
const HomePage = () => {
  const { isMobile } = useMedia()
  const [step, setStep] = useState<Step>('enter-pay')
  const { isBySizeWidth, isBySizeHeight } = useSizeScreen()
  const { reSize, height, width } = useSizePoss()
  const [value, setValue] = useState('0')
  const [infoPay, setInfoPay] = useState<InfoPay | null>(null)

  console.log({ infoPay })

  return (
    <section
      className={cn(
        'bg-web-main flex justify-center flex-col items-center w-full h-full min-h-screen ',
        isBySizeWidth ? 'w-full' : 'h-full',
        isBySizeHeight ? 'h-full' : 'w-full'
      )}
    >
      <div className={cn('relative flex items-center justify-center', isBySizeWidth && 'w-full', isBySizeHeight && 'h-full')}>
        <MyImage
          alt='possCase'
          className={cn(
            'poss-case',
            isMobile && ' !z-99 object-contain !w-screen !h-auto',
            !isMobile && ' !z-99 object-contain !max-w-[100dvw]  !max-h-[100dvh] ',
            isBySizeWidth && !isMobile && 'md:!w-[calc(100dvh-100px)] !w-[calc(100dvh-10px)] !h-auto',
            isBySizeHeight && !isMobile && 'md:!w-auto !w-full md:!h-[calc(100dvh-100px)] !h-[calc(100dvh-10px)]'
          )}
          src={images.home.possCase}
          style={{
            userSelect: 'none',
          }}
          onLoad={() => {
            setTimeout(() => {
              reSize()
            }, 1000)
          }}
        />

        <div
          className='absolute bg-black    z-999 flex justify-end items-end '
          style={{
            width: width * 0.82,
            height: height * 0.63,
            left: width * 0.08935,
            bottom: height * 0.05932203389,
          }}
        >
          {step === 'enter-pay' && <EnterPay onActivity={() => setStep('history')} onNewSale={() => setStep('enter-amount')} />}
          {step === 'enter-amount' && (
            <EnterAmount
              setValue={setValue}
              value={value}
              onBack={() => setStep('enter-pay')}
              onNext={(infoPay) => {
                setInfoPay(infoPay)
                setStep('qr')
              }}
            />
          )}
          {step === 'qr' && infoPay && (
            <QrPay
              amount={value}
              infoPay={infoPay}
              onBack={() => setStep('enter-amount')}
              onClose={() => setStep('enter-pay')}
              onSuccess={() => setStep('success')}
            />
          )}
          {step === 'success' && <PaySuccess amount={value} onBack={() => setStep('enter-pay')} onNewSale={() => setStep('enter-amount')} />}
        </div>
      </div>
      {isBySizeWidth && <p>isBySizeWidth</p>}
      {isBySizeHeight && <p>isBySizeHeight</p>}
    </section>
  )
}

export default HomePage
