'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'

import { images } from '@/config/images'
import MyImage from '@/components/MyImage'
import useSizePoss from '@/hooks/useSizePoss'

type Props = {
  onBack?: () => void
}

function Header({ onBack }: Props) {
  const { heightContent } = useSizePoss()

  return (
    <div
      className='flex w-full items-center justify-between '
      style={{
        padding: heightContent * 0.01,
      }}
    >
      <button className='rounded-full  transition-colors hover:bg-slate-800/50 cursor-pointer active:scale-90' onClick={onBack}>
        <ArrowLeft
          className='  text-slate-400'
          style={{
            height: heightContent * 0.04,
          }}
        />
      </button>

      <div className='flex items-center gap-1.5 px-3 py-1.5'>
        <img
          alt='WalletConnect'
          src={images.icons.walletConnect}
          style={{
            height: heightContent * 0.035,
          }}
        />
        {/* <span className='text-xl font-bold text-white tracking-tight'>Pay</span> */}
      </div>
    </div>
  )
}

export default Header
