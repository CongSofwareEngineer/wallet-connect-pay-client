'use client'

import { useState } from 'react'

import EnterPay from './(Component)/EnterPay'
import EnterAmount from './(Component)/EnterAmount'

import MyImage from '@/components/MyImage'
import { images } from '@/config/images'
import useSizePoss from '@/hooks/useSizePoss'
import useSizeScreen from '@/hooks/useSizeScreen'
import { cn } from '@/utils/tailwind'
type Step = 'enter-pay' | 'enter-pin' | 'enter-amount' | 'qr' | 'success' | 'history'
const HomePage = () => {
  const [step, setStep] = useState<Step>('enter-pay')
  const { isBySizeWidth, isBySizeHeight } = useSizeScreen()
  const { reSize, height, width } = useSizePoss()
  const [value, setValue] = useState('0.0')

  const handleKeyPress = (key: string) => {
    if (key === 'back') {
      if (value.length <= 1 || value === '0' || value === '0.0') {
        setValue('0.0')
      } else {
        setValue((prev) => {
          const next = prev.slice(0, -2)

          return next === '' ? '0.0' : next
        })
      }

      return
    }
    if (key === '0' && value === '0') {
      return
    }

    if (value === '0.0') {
      if (key === '.') {
        setValue('0.')
      } else {
        setValue(key)
      }
    } else {
      if (key === '.' && value.includes('.')) return
      setValue((prev) => prev + key)
    }
  }

  return (
    <section
      className={cn(
        'bg-web-main flex justify-center flex-col items-center w-full min-h-screen h-svh',
        isBySizeWidth ? 'w-full' : 'h-full',
        isBySizeHeight ? 'h-full' : 'w-full'
      )}
    >
      <div className={cn(' relative flex items-center justify-center', isBySizeWidth && 'w-full', isBySizeHeight && 'h-full')}>
        <MyImage
          alt='possCase'
          className={cn(
            'poss-case',
            ' w-full !z-99 object-contain !max-w-[600px]  !max-h-[1000px] ',
            isBySizeWidth && '!w-[calc(100dvh-100px)] !h-auto',
            isBySizeHeight && '!w-auto !h-[calc(100dvh-100px)]'
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
            <EnterAmount setValue={handleKeyPress} value={value} onBack={() => setStep('enter-pay')} onNext={(_amount) => setStep('qr')} />
          )}
        </div>
      </div>
      {isBySizeWidth && <p>isBySizeWidth</p>}
      {isBySizeHeight && <p>isBySizeHeight</p>}
    </section>
  )
}

export default HomePage
