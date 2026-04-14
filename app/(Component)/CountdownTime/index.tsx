import React from 'react'

import Div from '../ContainerContent/Div'
import Span from '../ContainerContent/Span'

import useLanguage from '@/hooks/useLanguage'
import useSizePoss from '@/hooks/useSizePoss'
import useCountdown from '@/hooks/useCountdown'

function CountdownTime() {
  const { translate } = useLanguage()
  const { heightContent } = useSizePoss()
  const { formattedTime } = useCountdown(900) // 15 minutes

  return (
    <Div className='flex flex-col items-center gap-1 ' style={{ marginTop: heightContent * 0.02 }}>
      <Span className='text-slate-400  '>
        {translate('walletConnectPay.paymentExpiresIn')} <Span className='text-blue-500 font-bold'>{formattedTime}</Span>
      </Span>
    </Div>
  )
}

export default CountdownTime
