import React from 'react'

import useSizePoss from '@/hooks/useSizePoss'

function ContainerContent({ children }: { children: React.ReactNode }) {
  const { width, height } = useSizePoss()

  return (
    <div
      className='flex flex-col relative z-999  items-center bg-black p-4'
      style={{
        width: width * 0.82,
        height: height * 0.63,
      }}
    >
      {children}
    </div>
  )
}

export default ContainerContent
