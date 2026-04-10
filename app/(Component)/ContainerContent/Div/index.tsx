import React, { HtmlHTMLAttributes } from 'react'

import useSizePoss from '@/hooks/useSizePoss'

const Div = ({ children, className, style, ...props }: HtmlHTMLAttributes<HTMLDivElement>) => {
  const { heightContent } = useSizePoss()

  const getFontSize = () => {
    const size = style?.fontSize || 14

    switch (size) {
      case 12:
        return heightContent * 0.02
      case 13:
        return heightContent * 0.027
      case 14:
        return heightContent * 0.03
      case 16:
        return heightContent * 0.04
      case 18:
        return heightContent * 0.06
      case 20:
        return heightContent * 0.07
      case 22:
        return heightContent * 0.08
      default:
        size
    }
  }

  const getGap = () => {
    let size = style?.gap || 0

    if (className?.includes('gap-4')) {
      size = 4
    }
    if (className?.includes('gap-6')) {
      size = 6
    }
    if (className?.includes('gap-2')) {
      size = 2
    }

    switch (size) {
      case 2:
        return heightContent * 0.01
      case 4:
        return heightContent * 0.015
      case 14:
        return heightContent * 0.05
      case 16:
        return heightContent * 0.05
      default:
        size
    }
  }

  const getStyle = () => {
    const styleConfig: any = {
      ...style,
      fontSize: getFontSize(),
      gap: getGap(),
    }

    return styleConfig
  }

  const getClassName = () => {
    let classNameConfig = className || ''

    if (className?.includes('gap-4')) {
      classNameConfig = classNameConfig.replace('gap-4', '')
    }
    if (className?.includes('gap-6')) {
      classNameConfig = classNameConfig.replace('gap-6', '')
    }
    if (className?.includes('gap-2')) {
      classNameConfig = classNameConfig.replace('gap-2', '')
    }

    return classNameConfig
  }

  return (
    <div {...props} className={getClassName()} style={getStyle()}>
      {children}
    </div>
  )
}

export default Div
