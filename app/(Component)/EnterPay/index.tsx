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
import { TYPE_CURRENCY } from '@/app/page'

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

const CURRENCY_LIST = [
  {
    name: 'USD' as TYPE_CURRENCY,
    icon: images.icons.usd,
  },
  {
    name: 'ERO' as TYPE_CURRENCY,
    icon: images.icons.ero,
  },
]

type Props = {
  onNewSale: () => void
  onActivity: () => void
  currency: TYPE_CURRENCY
  setCurrency: (currency: TYPE_CURRENCY) => void
}

const EnterPay = ({ onNewSale, currency, setCurrency }: Props) => {
  const { width, heightContent, widthContent } = useSizePoss()
  const { translate } = useLanguage()
  const [selectedChain, setSelectedChain] = useState<ChainType>(PossUtils.chainType)
  const onChangeChain = (chain: ChainType) => {
    setSelectedChain(chain)
    PossUtils.chainType = chain
  }

  return (
    <ContainerContent>
      <div className='flex flex-col   items-center w-full h-full'>
        <Div className='flex flex-col  w-full items-center'>
          <Div
            className=' font-bold text-white'
            style={{
              paddingBottom: heightContent * 0.018,
              paddingTop: heightContent * 0.011,
              fontSize: 18,
            }}
          >
            {translate('walletConnectPay.posApp')}
          </Div>

          {/* Chain Selection */}
          <div className='w-full relative flex flex-col gap-3 px-1  '>
            <Div className=' text-slate-500   tracking-wider leading-none' style={{ fontSize: 13 }}>
              {translate('walletConnectPay.selectChain')}
            </Div>
            <div
              className='flex   items-center  overflow-x-auto no-scrollbar scroll-smooth'
              style={{
                paddingBottom: heightContent * 0.035,
                paddingTop: heightContent * 0.005,
                gap: widthContent * 0.08,
              }}
            >
              {chains.map((chain) => (
                <button
                  key={chain.chainType}
                  className={`relative flex-shrink-0  rounded-full p-[1px] transition-all duration-200 active:scale-90 ${selectedChain === chain.chainType ? 'bg-blue-500' : 'bg-transparent hover:bg-white/5'
                    }`}
                  style={{
                    width: widthContent * 0.105,
                    height: widthContent * 0.105,
                  }}
                  onClick={() => onChangeChain(chain.chainType)}
                >
                  <div className='w-full h-full rounded-full overflow-hidden   bg-slate-900 border border-slate-700/50 shadow-inner'>
                    <Image alt={chain.name} height={widthContent * 0.12} src={chain.icon} width={heightContent * 0.12} />
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
                width: widthContent + width * 0.046,
                left: -(width * 0.046),
              }}
            />
          </div>

          <div className='w-full relative flex flex-col gap-3 px-1  '>
            <Div className=' text-slate-500   tracking-wider leading-none' style={{ fontSize: 13, paddingTop: heightContent * 0.03 }}>
              {translate('walletConnectPay.selectCurrency')}
            </Div>
            <div
              className='flex   items-center  overflow-x-auto no-scrollbar scroll-smooth'
              style={{
                paddingBottom: heightContent * 0.035,
                paddingTop: heightContent * 0.005,
                gap: widthContent * 0.08,
              }}
            >
              {CURRENCY_LIST.map((token) => (
                <button
                  key={token.name}
                  className={`relative flex-shrink-0  rounded-full p-[1px] transition-all duration-200 active:scale-90 ${currency === token.name ? 'bg-blue-500' : 'bg-transparent opacity-50 hover:bg-white/5'
                    }`}
                  style={{
                    width: widthContent * 0.105,
                    height: widthContent * 0.105,
                  }}
                  onClick={() => setCurrency(token.name)}
                >
                  <div className='w-full h-full rounded-full overflow-hidden   bg-slate-900 border border-slate-700/50 shadow-inner'>
                    <Image alt={token.name} height={widthContent * 0.12} src={token.icon} width={heightContent * 0.12} />
                  </div>
                  {currency === token.name && (
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
                width: widthContent + width * 0.046,
                left: -(width * 0.046),
              }}
            />
          </div>
        </Div>

        <div
          className='w-full flex flex-col items-center '
          style={{
            paddingTop: heightContent * 0.07,
            paddingBottom: heightContent * 0.05,
          }}
        >
          <MyImage alt='WalletConnect' className='brightness-150 !w-[25%] !h-auto   grayscale-0 opacity-100' src={images.icons.walletConnect} />
        </div>

        <div className='flex flex-col gap-2 w-full items-center '>
          {/* Divider & Brand */}

          {/* Action Cards */}
          <div
            className='flex flex-col gap-6 w-full pt-2'
            style={{
              height: heightContent * 0.25,
            }}
          >
            <button
              className='w-full flex-1 py-2 flex cursor-pointer bg-[#2d3339] hover:bg-[#334155]/60 transition-all duration-300 rounded-[12px] flex-col items-center justify-center gap-1 shadow-xl border border-[#3A424D] group active:scale-[0.97]'
              onClick={onNewSale}
            >
              <div className=' group-hover:scale-110 transition-transform'>
                <PlusSquare
                  className='  text-slate-400'
                  strokeWidth={1.5}
                  style={{
                    width: heightContent * 0.06,
                    height: heightContent * 0.06,
                  }}
                />
              </div>
              <Div className=' tracking-wide'>{translate('walletConnectPay.newSale')}</Div>
            </button>

            {/* <button
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
            </button> */}
          </div>
        </div>
      </div>
    </ContainerContent>
  )
}

export default EnterPay
