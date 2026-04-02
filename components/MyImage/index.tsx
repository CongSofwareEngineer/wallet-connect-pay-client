import Image, { ImageProps } from 'next/image'

import { images } from '@/config/images'
import { cn } from '@/utils/tailwind'

type Props = {
  noAnimation?: boolean
} & Omit<ImageProps, 'alt' | 'src'> & {
  alt?: string
  src?: string
}
const MyImage = ({ noAnimation = false, src, alt = 'thay-hong-toan', ...props }: Props) => {
  return (
    <Image
      fill
      alt={alt}
      draggable={false}
      loading='lazy'
      priority={false}
      sizes='100vw'
      {...props}
      className={cn('!relative overflow-hidden', props?.className)}
      style={{

        ...props.style,
      }}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = images.icons.avatarDefault
      }}
      src={src || images.icons.avatarDefault}
    // src={src || images.icons.avatarDefault}
    />
  )
}

export default MyImage
