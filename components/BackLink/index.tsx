import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, HTMLAttributes } from 'react'

type BackLinkProps = {
  noBackLink?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLAnchorElement> &
  LinkProps
const BackLink = ({ noBackLink = false, target = '_self', ...props }: BackLinkProps) => {
  const handleClick = (e: any) => {
    const href = typeof props.href === 'string' ? props.href : ''

    if (!href.includes('#')) {
      props.onClick?.(e)

      return
    }

    e.preventDefault()

    const elementId = href.split('#')[1]

    console.log({ elementId })

    const element = document.getElementById(elementId)

    console.log({ element })

    if (element) {
      // Offset bù đắp cho fixed header để không bị che khuất nội dung
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      console.log({ offsetPosition })

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Cập nhật URL mà không gây nhảy trang (jump)
      // window.history.pushState(null, '', href)
    }

    props.onClick?.(e)
  }

  return (
    <Link
      {...props}
      rel={target === '_self' || noBackLink ? undefined : 'noopener noreferrer'}
      scroll={false} // Ngăn Next.js tự động scroll lên top khi click link
      target={target}
      onClick={handleClick}
    />
  )
}

export default BackLink
