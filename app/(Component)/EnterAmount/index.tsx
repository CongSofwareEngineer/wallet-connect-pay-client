'use client'

import React, { useState } from 'react'
import { Delete, ChevronLeft } from 'lucide-react'

import ContainerContent from '../ContainerContent'

type Props = {
  onBack: () => void
  onNext: (amount: string) => void
  value: string
  setValue: (value: string) => void
}

const EnterAmount = ({ onBack, onNext, value, setValue }: Props) => {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back']

  return (
    <ContainerContent>
      <div className='flex flex-col items-center justify-between w-full h-full overflow-hidden'>
        {/* Top: Header w/ Back Button */}
        <div className='w-full flex justify-start mb-2'>
          <button className='p-2 hover:bg-slate-800/50 rounded-full transition-colors cursor-pointer' onClick={onBack}>
            <ChevronLeft className='w-6 h-6 text-slate-400' />
          </button>
        </div>

        {/* Center: Amount and Text */}
        <div className='flex flex-col items-center justify-center flex-1 w-full gap-4'>
          <p className='text-slate-300 text-sm font-light'>Enter amount to charge</p>
          <div className='relative flex items-center justify-center'>
            <div className='flex items-baseline'>
              <span className='text-3xl font-bold text-slate-400 mb-2 mr-1'>$</span>
              <span className='text-5xl font-bold tracking-tight'>{value}</span>
            </div>
            {/* The red cursor line from the image */}
            {/* <div className='absolute -right-3 h-[80%] w-[3px] bg-red-600 rounded-full' /> */}
          </div>
        </div>

        {/* Bottom: Pad and Button */}
        <div className='w-full mt-auto space-y-4'>
          {/* Keypad */}
          <div className='grid grid-cols-3 gap-2 w-full'>
            {keys.map((key) => (
              <button
                key={key}
                className='flex items-center justify-center h-8 bg-[#1f2937] hover:bg-[#374151] active:scale-95 transition-all rounded-[12px] text-xl font-medium shadow-md cursor-pointer'
                onClick={() => setValue(key)}
              >
                {key === 'back' ? <Delete className='w-6 h-6 text-slate-300' /> : key}
              </button>
            ))}
          </div>

          {/* Action Button */}
          <button
            className='w-full py-3 bg-[#2563eb] hover:bg-blue-500 active:scale-98 transition-all rounded-[16px] text-slate-300 font-semibold text-base shadow-lg cursor-pointer'
            onClick={() => onNext(value)}
          >
            Enter Amount
          </button>
        </div>
      </div>
    </ContainerContent>
  )
}

export default EnterAmount
