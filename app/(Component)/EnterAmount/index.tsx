'use client'

import React, { useMemo, useState } from 'react'
import Bignumber, { BigNumber } from 'bignumber.js'
import { Delete, ChevronLeft } from 'lucide-react'

import ContainerContent from '../ContainerContent'
import Header from '../ContainerContent/Header'
import Div from '../ContainerContent/Div'
import Span from '../ContainerContent/Span'

import { cn } from '@/utils/tailwind'
import MyButton from '@/components/MyButton'
import useLanguage from '@/hooks/useLanguage'
import PossServices, { InfoPay } from '@/services/API/poss'
import useSizePoss from '@/hooks/useSizePoss'
import { TYPE_CURRENCY } from '@/app/page'

type Props = {
  onBack: () => void
  onNext: (infoPay: InfoPay) => void
  value: string
  setValue: (value: string) => void
  currency: 'USD' | 'ERO'
}
const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back']

const EnterAmount = ({ onBack, onNext, value, setValue, currency }: Props) => {
  const { translate } = useLanguage()
  const { heightContent } = useSizePoss()
  const [loading, setLoading] = useState(false)
  const isValidValue = useMemo(() => {
    try {
      if (BigNumber(value || '0').gte(0.01)) {
        return true
      }
    } catch {
      return false
    }
  }, [value])

  const handleKeyPress = (key: string) => {
    if (key === 'back') {
      if (value.length <= 1 || value === '0' || value === '0.0') {
        setValue('')
      } else {
        setValue(value.slice(0, value.length - 1))
      }

      return
    }
    if (key === '0' && value === '0') {
      return
    }

    if (value === '0') {
      if (key === '.') {
        setValue('0.')
      } else {
        setValue(key)
      }
    } else {
      if (key === '.' && value.includes('.')) return

      if (value.includes('.')) {
        const decimalPart = value.split('.')[1]

        if (decimalPart && decimalPart.length >= 2) return
      }

      setValue(`${value}${key}`)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    PossServices.isStopTracking = false
    const res = await PossServices.createPayment(value, currency)

    setLoading(false)
    onNext(res)
  }

  const renderBtn = () => {
    let text = translate('walletConnectPay.enterAmount')

    if (isValidValue) {
      text = `Charge $${BigNumber(value).toFormat()}`
    } else {
      if (loading) {
        text = translate('accounts.loading')
      }
    }

    return (
      <MyButton
        className={cn(
          'w-full  bg-[#2563eb] hover:bg-blue-500 active:scale-98 transition-all   shadow-lg ',
          isValidValue ? 'cursor-pointer' : 'cursor-not-allowed'
        )}
        disabled={!isValidValue || loading}
        style={{
          height: heightContent * 0.08,
        }}
        onClick={handleSubmit}
      >
        <Div className='max-w-full text-ellipsis overflow-hidden'>{text}</Div>
      </MyButton>
    )
  }

  return (
    <ContainerContent>
      <div className='flex flex-col items-center justify-between w-full h-full overflow-hidden'>
        <Header onBack={() => onBack()} />
        <div className='flex bg-[#1e293b]/50 rounded-tl-2xl rounded-tr-2xl p-4 flex-col items-center   w-full flex-1 justify-center'>
          {/* Center: Amount and Text */}
          <Div className='flex gap-2 flex-col items-center justify-center flex-1 w-full  '>
            <Div className='  font-light'>{translate('walletConnectPay.enterAmountToCharge')}</Div>
            <div className='relative flex items-center justify-center'>
              <div className='flex items-baseline'>
                <Span className={cn('font-bold  mb-2 mr-1', isValidValue ? '' : 'text-slate-400')} style={{ fontSize: 18 }}>
                  {currency === 'USD' ? '$' : '€'}
                </Span>
                <Span className={cn('font-bold  tracking-tight', isValidValue ? '' : 'text-slate-400')} style={{ fontSize: 18 }}>
                  {value || '0.00'}
                </Span>
              </div>
              {/* The red cursor line from the image */}
              {/* <div className='absolute -right-3 h-[80%] w-[3px] bg-red-600 rounded-full' /> */}
            </div>
          </Div>

          {/* Bottom: Pad and Button */}
          <div className='w-full mt-auto  '>
            <Div className='text-slate-400 text-center' style={{ paddingBottom: heightContent * 0.01, fontSize: 14 }}>
              Minimum amount: $0.01
            </Div>
            {/* Keypad */}
            <Div className='grid grid-cols-3 gap-4 w-full' style={{ paddingBottom: heightContent * 0.02 }}>
              {keys.map((key) => (
                <button
                  key={key}
                  className='flex items-center justify-center  bg-[#1f2937] hover:bg-[#374151] active:scale-95 transition-all rounded-[6px]  font-medium shadow-md cursor-pointer'
                  style={{
                    height: heightContent * 0.08,
                  }}
                  onClick={() => handleKeyPress(key)}
                >
                  {key === 'back' ? <Delete style={{ height: heightContent * 0.06 }} /> : <Div style={{ fontSize: 16 }}>{key}</Div>}
                </button>
              ))}
            </Div>

            {/* Action Button */}
            {renderBtn()}
          </div>
        </div>
      </div>
    </ContainerContent>
  )
}

export default EnterAmount
