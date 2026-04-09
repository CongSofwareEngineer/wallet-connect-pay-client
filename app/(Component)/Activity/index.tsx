'use client'

import React, { useState } from 'react'

import Filter from './Filter'

import Div from '@/app/(Component)/ContainerContent/Div'
import Header from '@/app/(Component)/ContainerContent/Header'
import Span from '@/app/(Component)/ContainerContent/Span'

type FilterType = 'All' | 'Fail' | 'Pending' | 'Complete'

const Activity = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Complete')

  const activities = [
    {
      id: '63d5ae49-02cf-4056-bb1f-51ewff54-e9fe',
      date: '2026-02-12 08:41',
      amount: '$2.5',
      paidWith: 'USDT 2.5',
      network: 'Ethereum Mainnet',
      status: 'Complete',
    },
    {
      id: '15e3ae49-02cf-4056-bb1f-51ewff54-e9fe',
      date: '2026-02-08 08:41',
      amount: '$2.5',
      paidWith: 'USDT 2.5',
      network: 'Ethereum Mainnet',
      status: 'Complete',
    },
  ]

  return (
    <Div className='flex flex-col h-full w-full bg-[#111418]'>
      <Header onBack={() => { }} />

      <Div className='flex flex-col px-4 gap-6 flex-1 overflow-y-auto pb-10'>
        <Filter activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <Div className='flex flex-col gap-6'>
          {activities.map((item, index) => (
            <Div key={index} className='flex flex-col gap-2 p-5 rounded-3xl bg-slate-800/30 ring-1 ring-slate-800'>
              <Div className='flex items-center justify-between w-full'>
                <Div className='flex flex-col'>
                  <Span className='text-slate-500 uppercase font-semibold' style={{ fontSize: 12 }}>
                    ID
                  </Span>
                  <Span className='text-white font-medium break-all max-w-[200px]' style={{ fontSize: 14 }}>
                    {item.id}
                  </Span>
                </Div>
                <Span className='bg-[#1F3D35] text-[#4ADE80] px-2 py-0.5 rounded-md font-medium' style={{ fontSize: 12 }}>
                  {item.date}
                </Span>
              </Div>

              <Div className='flex flex-col mt-2'>
                <Span className='text-slate-500 uppercase font-semibold' style={{ fontSize: 12 }}>
                  AMOUNT
                </Span>
                <Span className='text-white font-bold' style={{ fontSize: 18 }}>
                  {item.amount}
                </Span>
              </Div>

              <Div className='flex flex-col'>
                <Span className='text-slate-500 uppercase font-semibold' style={{ fontSize: 12 }}>
                  PAID WITH
                </Span>
                <Span className='text-white font-semibold' style={{ fontSize: 16 }}>
                  {item.paidWith}
                </Span>
              </Div>

              <Div className='flex flex-col'>
                <Span className='text-slate-500 uppercase font-semibold' style={{ fontSize: 12 }}>
                  NETWORK
                </Span>
                <Span className='text-white font-semibold' style={{ fontSize: 16 }}>
                  {item.network}
                </Span>
              </Div>
            </Div>
          ))}
        </Div>
      </Div>
    </Div>
  )
}

export default Activity
