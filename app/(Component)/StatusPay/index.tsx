import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Timer, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Spinner } from '@heroui/spinner'

import PossServices, { InfoPay, InfoTrackingPayment } from '@/services/API/poss'
import useLanguage from '@/hooks/useLanguage'

function StatusPay({ infoPay, onSuccess }: { infoPay: InfoPay; onSuccess?: () => void }) {
  const { translate } = useLanguage()
  const [status, setStatus] = useState<InfoTrackingPayment>('requires_action')

  useEffect(() => {
    if (infoPay.paymentId) {
      PossServices.trackingPayment(infoPay.paymentId, (status) => {
        if (status) {
          setStatus(status)
          if (status === 'success' || status === 'succeeded') {
            onSuccess?.()
          }
        }
      })
    }
  }, [])
  console.log({ status })

  if (status === 'requires_action' || !status) return null

  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          icon: <Spinner className='text-blue-500' />,
          text: translate('walletConnectPay.status.processing'),
          color: 'text-blue-500',
        }
      case 'succeeded':
      case 'success':
        return {
          icon: <CheckCircle2 className='w-16 h-16 text-green-500' />,
          text: translate('walletConnectPay.status.succeeded'),
          color: 'text-green-500',
        }
      case 'failed':
        return {
          icon: <XCircle className='w-16 h-16 text-red-500' />,
          text: translate('walletConnectPay.status.failed'),
          color: 'text-red-500',
        }
      case 'expired':
        return {
          icon: <Timer className='w-16 h-16 text-yellow-500' />,
          text: translate('walletConnectPay.status.expired'),
          color: 'text-yellow-500',
        }
      case 'cancelled':
        return {
          icon: <AlertCircle className='w-16 h-16 text-slate-400' />,
          text: translate('walletConnectPay.status.cancelled'),
          color: 'text-slate-400',
        }
      default:
        return {
          icon: <AlertCircle className='w-16 h-16 text-slate-400' />,
          text: status,
          color: 'text-slate-400',
        }
    }
  }

  const config = getStatusConfig()

  return (
    <div className='absolute inset-0 z-[1000] bg-[#111827]/90 rounded-[6px] flex flex-col items-center justify-center p-4 text-center'>
      {config.icon}
      <h3 className={`text-sm font-bold ${config.color}`}>{config.text}</h3>
    </div>
  )
}

export default StatusPay
