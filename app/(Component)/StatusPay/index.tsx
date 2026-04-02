import React, { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, Timer, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Spinner } from '@heroui/spinner'

import PossServices, { InfoPay, InfoTrackingPayment } from '@/services/API/poss'

function StatusPay({ infoPay }: { infoPay: InfoPay }) {
  const [status, setStatus] = useState<InfoTrackingPayment>('requires_action')

  useEffect(() => {
    if (infoPay.paymentId) {
      PossServices.trackingPayment(infoPay.paymentId, (status) => {
        if (status) {
          setStatus(status)
        }
      })
    }
  }, [infoPay.paymentId])

  if (status === 'requires_action' || !status) return null

  const getStatusConfig = () => {
    switch (status) {
      case 'processing':
        return {
          icon: <Spinner className='text-blue-500' />,
          text: 'Đang xử lý',
          color: 'text-blue-500',
        }
      case 'succeeded':
        return {
          icon: <CheckCircle2 className='w-16 h-16 text-green-500' />,
          text: 'Thanh toán thành công',
          color: 'text-green-500',
        }
      case 'failed':
        return {
          icon: <XCircle className='w-16 h-16 text-red-500' />,
          text: 'Thanh toán thất bại',
          color: 'text-red-500',
        }
      case 'expired':
        return {
          icon: <Timer className='w-16 h-16 text-yellow-500' />,
          text: 'Thanh toán hết hạn',
          color: 'text-yellow-500',
        }
      case 'cancelled':
        return {
          icon: <AlertCircle className='w-16 h-16 text-slate-400' />,
          text: 'Thanh toán đã hủy',
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
    <AnimatePresence>
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className='absolute inset-0 z-[1000] bg-[#111827]/90 rounded-[6px] flex flex-col items-center justify-center p-4 text-center'
        exit={{ opacity: 0, scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.9 }}
      >
        <div className='mb-3'>{React.cloneElement(config.icon as React.ReactElement, { className: 'w-10 h-10 ' + config.color })}</div>
        <h3 className={`text-sm font-bold ${config.color}`}>{config.text}</h3>
      </motion.div>
    </AnimatePresence>
  )
}

export default StatusPay
