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
  const { width, heightContent, widthContent } = useSizePoss()
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
          <Div
            className=' font-bold text-white'
            style={{
              paddingBottom: heightContent * 0.005,
              fontSize: 18,
            }}
          >
            {translate('walletConnectPay.posApp')}
          </Div>
          {/* Title */}

          {/* Chain Selection */}
          <div className='w-full relative flex flex-col gap-3 px-1  '>
            <Div className=' font-medium text-slate-500   tracking-wider leading-none'>{translate('walletConnectPay.selectChain')}</Div>
            <div
              className='flex   items-center  overflow-x-auto no-scrollbar scroll-smooth'
              style={{
                paddingBottom: heightContent * 0.03,
                gap: widthContent * 0.04,
              }}
            >
              {chains.map((chain) => (
                <button
                  key={chain.chainType}
                  className={`relative flex-shrink-0  rounded-full p-[1px] transition-all duration-200 active:scale-90 ${selectedChain === chain.chainType ? 'bg-blue-500' : 'bg-transparent hover:bg-white/5'
                    }`}
                  style={{
                    width: widthContent * 0.13,
                    height: widthContent * 0.13,
                  }}
                  onClick={() => onChangeChain(chain.chainType)}
                >
                  <div className='w-full h-full rounded-full   bg-slate-900 border border-slate-700/50 shadow-inner'>
                    <Image alt={chain.name} height={widthContent * 0.12} src={chain.icon} width={widthContent * 0.12} />
                  </div>
                  {selectedChain === chain.chainType && (
                    <div
                      className='absolute   bg-blue-500 rounded-full p-[2px] border-[#111827] shadow-sm'
                      style={{
                        top: 0,
                        right: -widthContent * 0.01,
                      }}
                    >
                      <Check
                        className='  text-white'
                        strokeWidth={4}
                        style={{
                          width: widthContent * 0.04,
                          height: widthContent * 0.04,
                        }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
            <div
              className='absolute bottom-0   right-0  border-b border-white/15   h-1'
              style={{
                width: widthContent,
                left: -(width * 0.05),
              }}
            />
          </div>
        </Div>

        <div className='flex flex-col gap-2 w-full items-center'>
          {/* Divider & Brand */}
          <div className='w-full flex flex-col items-center gap-4'>
            <MyImage alt='WalletConnect' className='brightness-150 !w-[30%] !h-auto   grayscale-0 opacity-100' src={images.icons.walletConnect} />
          </div>

          {/* Action Cards */}
          <div className='flex flex-col flex-1 gap-6 w-full pt-2'>
            <button
              className='w-full flex-1 py-2 flex cursor-pointer bg-[#1e293b]/50 hover:bg-[#334155]/60 transition-all duration-300 rounded-[12px] flex-col items-center justify-center gap-1 shadow-xl border border-white/5 group active:scale-[0.97]'
              style={{
                minHeight: heightContent * 0.2,
              }}
              onClick={onNewSale}
            >
              <div className=' group-hover:scale-110 transition-transform'>
                <PlusSquare className='w-6 h-6 text-slate-400' strokeWidth={1.5} />
              </div>
              <Div className=' tracking-wide'>{translate('walletConnectPay.newSale')}</Div>
            </button>

            <button
              className='w-full flex-1 py-2 flex cursor-pointer bg-[#1e293b]/50 hover:bg-[#334155]/60 transition-all duration-300 rounded-[12px] flex-col items-center justify-center gap-1 shadow-xl border border-white/5 group active:scale-[0.97]'
              style={{
                minHeight: heightContent * 0.2,
              }}
              onClick={onActivity}
            >
              <div className=' group-hover:scale-110 transition-transform'>
                <History className='w-6 h-6 text-slate-400' strokeWidth={1.5} />
              </div>
              <Div className=' tracking-wide'>{translate('walletConnectPay.activity')}</Div>
            </button>
          </div>
        </div>
      </div>
    </ContainerContent>
  )
}

export default EnterPay
