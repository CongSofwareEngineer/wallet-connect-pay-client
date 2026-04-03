'use client'

import React, { useState } from 'react'
import { PlusSquare, History, Check } from 'lucide-react'
import Image from 'next/image'

import ContainerContent from '../ContainerContent'
import Div from '../ContainerContent/Div'

import useLanguage from '@/hooks/useLanguage'
import { images } from '@/config/images'
import useSizePoss from '@/hooks/useSizePoss'
import PossUtils, { ChainType } from '@/utils/poss'
import MyImage from '@/components/MyImage'

const chains = [
  {
    chainType: 'ethereum' as ChainType,
    name: 'Ethereum',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png',
  },
  {
    chainType: 'base' as ChainType,
    name: 'Base',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/base/info/logo.png',
  },
  {
    chainType: 'optimism' as ChainType,
    name: 'Optimism',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png',
  },
  {
    chainType: 'polygon' as ChainType,
    name: 'Polygon',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png',
  },
  {
    chainType: 'arbitrum' as ChainType,
    name: 'Arbitrum',
    icon: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png',
  },
]

type Props = {
  onNewSale: () => void
  onActivity: () => void
}

const EnterPay = ({ onNewSale, onActivity }: Props) => {
  const { width } = useSizePoss()
  const { translate } = useLanguage()
  const [selectedChain, setSelectedChain] = useState<ChainType>(PossUtils.chainType)
  const onChangeChain = (chain: ChainType) => {
    setSelectedChain(chain)
    PossUtils.chainType = chain
  }

  return (
    <ContainerContent>
      <div className='flex flex-col   items-center justify-between w-full h-full'>
        <Div className='flex flex-col gap-4 w-full items-center'>
          <h1 className='text-xl font-bold text-white'>{translate('walletConnectPay.posApp')}</h1>
          {/* Title */}

          {/* Chain Selection */}
          <div className='w-full flex flex-col gap-3 px-1  '>
            <Div className=' font-medium text-slate-500 uppercase tracking-wider leading-none'>{translate('walletConnectPay.selectChain')}</Div>
            <div className='flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth'>
              {chains.map((chain) => (
                <button
                  key={chain.chainType}
                  className={`relative flex-shrink-0  rounded-full p-[2px] transition-all duration-200 active:scale-90 ${selectedChain === chain.chainType ? 'bg-blue-500' : 'bg-transparent hover:bg-white/5'
                    }`}
                  style={{
                    width: width * 0.1,
                    height: width * 0.1,
                  }}
                  onClick={() => onChangeChain(chain.chainType)}
                >
                  <div className='w-full h-full rounded-full overflow-hidden bg-slate-900 border border-slate-700/50 shadow-inner'>
                    <Image alt={chain.name} height={48} src={chain.icon} width={48} />
                  </div>
                  {selectedChain === chain.chainType && (
                    <div className='absolute -top-0.5 -right-0.5 bg-blue-500 rounded-full p-[2px] border-2 border-[#111827] shadow-sm'>
                      <Check className='w-2.5 h-2.5 text-white' strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Div>

        <div className='flex flex-col gap-2 w-full items-center'>
          {/* Divider & Brand */}
          <div className='w-full flex flex-col items-center gap-4 border-t border-white/5 '>
            <MyImage alt='WalletConnect' className='brightness-150 !w-[20%] !h-auto   grayscale-0 opacity-100' src={images.icons.walletConnect} />
          </div>

          {/* Action Cards */}
          <div className='flex flex-col flex-1 gap-6 w-full pt-2'>
            <button
              className='w-full flex-1 py-2 flex cursor-pointer bg-[#1e293b]/50 hover:bg-[#334155]/60 transition-all duration-300 rounded-[12px] flex-col items-center justify-center gap-1 shadow-xl border border-white/5 group active:scale-[0.97]'
              onClick={onNewSale}
            >
              <div className='bg-[#111827]/40   border border-white/5 group-hover:scale-110 transition-transform'>
                <PlusSquare className='w-6 h-6 text-slate-400' strokeWidth={1.5} />
              </div>
              <Div className='text-sm text-slate-300 font-medium tracking-wide'>{translate('walletConnectPay.newSale')}</Div>
            </button>

            <button
              className='w-full flex-1 py-2 flex cursor-pointer bg-[#1e293b]/50 hover:bg-[#334155]/60 transition-all duration-300 rounded-[12px] flex-col items-center justify-center gap-1 shadow-xl border border-white/5 group active:scale-[0.97]'
              onClick={onActivity}
            >
              <div className='bg-[#111827]/40   border border-white/5 group-hover:scale-110 transition-transform'>
                <History className='w-6 h-6 text-slate-400' strokeWidth={1.5} />
              </div>
              <Div className='text-sm text-slate-300 font-medium tracking-wide'>{translate('walletConnectPay.activity')}</Div>
            </button>
          </div>
        </div>
      </div>
    </ContainerContent>
  )
}

export default EnterPay
