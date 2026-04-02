import React from 'react'
import { PlusSquare, History } from 'lucide-react'

import ContainerContent from '../ContainerContent'

type Props = {
  onNewSale: () => void
  onActivity: () => void
}
const EnterPay = ({ onNewSale, onActivity }: Props) => {
  return (
    <ContainerContent>
      <div className='flex flex-col gap-8 items-center justify-between w-full h-full'>
        <div className='flex flex-col  items-center'>
          {/* Header */}
          <h1 className='text-3xl font-bold   '>POS App</h1>

          {/* Pay Subheader */}
          <div className='flex items-center gap-2 '>
            <div className='flex items-center justify-center'>
              {/* Mock WalletConnect Logo / Pay Icon */}
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
              </svg>
            </div>
            <span className='text-lg font-medium'>Pay</span>
          </div>
        </div>

        {/* Action Cards */}
        <div className='flex flex-col flex-1 gap-6 w-full '>
          <button
            className='w-full flex-1 flex  cursor-pointer  bg-[#1f2937] hover:bg-[#374151] transition-all rounded-[24px]   flex-col items-center justify-center gap-3 shadow-xl'
            onClick={onNewSale}
          >
            <PlusSquare className='w-10 h-10 text-slate-400' strokeWidth={1.5} />
            <span className='text-sm text-slate-300 font-medium'>New Sale</span>
          </button>

          <button
            className='w-full flex-1 flex  cursor-pointer  bg-[#1f2937] hover:bg-[#374151] transition-all rounded-[24px]   flex-col items-center justify-center gap-3 shadow-xl'
            onClick={onActivity}
          >
            <History className='w-10 h-10 text-slate-400' strokeWidth={1.5} />
            <span className='text-sm text-slate-300 font-medium'>Activity</span>
          </button>
        </div>
      </div>
    </ContainerContent>
  )
}

export default EnterPay
