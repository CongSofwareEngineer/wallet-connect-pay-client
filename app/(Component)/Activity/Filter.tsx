import React from 'react'

import Div from '@/app/(Component)/ContainerContent/Div'
import Span from '@/app/(Component)/ContainerContent/Span'

type FilterType = 'All' | 'Fail' | 'Pending' | 'Complete'

interface FilterProps {
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
}

const Filter = ({ activeFilter, onFilterChange }: FilterProps) => {
  const filters: { label: FilterType; color?: string }[] = [
    { label: 'All' },
    { label: 'Fail', color: '#EF4444' },
    { label: 'Pending', color: '#3B82F6' },
    { label: 'Complete', color: '#10B981' },
  ]

  return (
    <Div className='flex items-center gap-3 w-full overflow-x-auto no-scrollbar py-2'>
      {filters.map((filter) => {
        const isActive = activeFilter === filter.label
        const isCompleteActive = isActive && filter.label === 'Complete'
        
        return (
          <button
            key={filter.label}
            onClick={() => onFilterChange(filter.label)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-xl transition-all ${
              isCompleteActive 
                ? 'bg-[#2563EB] text-white' 
                : isActive 
                  ? 'bg-slate-700 text-white' 
                  : 'bg-[#1E293B]/50 text-slate-400'
            }`}
          >
            {filter.color && (
              <div 
                className='w-1.5 h-1.5 rounded-full' 
                style={{ backgroundColor: filter.color }} 
              />
            )}
            <Span
              style={{ fontSize: 14 }}
              className='font-medium'
            >
              {filter.label}
            </Span>
          </button>
        )
      })}
    </Div>
  )
}

export default Filter
