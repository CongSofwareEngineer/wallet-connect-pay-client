import React from 'react'

import useSizePoss from '@/hooks/useSizePoss'

function ContainerContent({ children }: { children: React.ReactNode }) {
  const { widthContent } = useSizePoss()

  return (
    <div
      className='flex overflow-hidden flex-col relative z-999  items-center bg-black '
      style={{
        width: '100%',
        height: '100%',
        padding: widthContent * 0.05,
      }}
    >
      {children}
    </div>
  )
}

export default ContainerContent
