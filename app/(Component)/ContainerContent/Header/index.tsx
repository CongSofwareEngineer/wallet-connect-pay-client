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
  const { width } = useSizePoss()

  return (
    <div className='flex w-full items-center justify-between p-1'>
      <button className='rounded-full p-2 transition-colors hover:bg-slate-800/50 cursor-pointer active:scale-90' onClick={onBack}>
        <ArrowLeft className='h-6  text-slate-400' />
      </button>

      <div className='flex items-center gap-1.5 px-3 py-1.5'>
        <MyImage alt='WalletConnect' className='!h-5 !w-auto' quality={100} src={images.icons.walletConnect} />
        {/* <span className='text-xl font-bold text-white tracking-tight'>Pay</span> */}
      </div>
    </div>
  )
}

export default Header
