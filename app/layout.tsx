import '@/styles/aos.css'
import '@/styles/globals.scss'
import '@/styles/overrides.scss'
import { GoogleTagManager } from '@next/third-parties/google'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'
import { Inter, Monomaniac_One, Sansita } from 'next/font/google'

import ClientRender from '@/components/ClientRender'
import { HeroUIProvider } from '@/components/HeroUIProvider'
import ReactQueryProvider from '@/components/ReactQueryProvider'
import StyledComponentsRegistry from '@/components/StyledComponentsRegistry'
import { SITE_CONFIG } from '@/config/site'
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSans = Sansita({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  weight: ['400', '700', '800', '900'],
})

const monomaniacOne = Monomaniac_One({
  subsets: ['latin'],
  variable: '--font-monomaniac-one',
  weight: ['400'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: `%s - ${SITE_CONFIG.title}`,
  },
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,

  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: SITE_CONFIG.images,
    siteName: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    phoneNumbers: ['+84392225405'],
    locale: 'vi',
    emails: 'hodiencong2000@gmail.com',
    countryName: 'Vietnamese',
    type: 'website',
  },
  bookmarks: SITE_CONFIG.url,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: SITE_CONFIG.title,
  icons: {
    icon: { url: SITE_CONFIG.icon },
    shortcut: { url: SITE_CONFIG.icon },
    apple: { url: SITE_CONFIG.icon },
  },
  manifest: '/manifest.json',
  twitter: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: SITE_CONFIG.images,
    site: SITE_CONFIG.url,
  },
  appleWebApp: {
    title: SITE_CONFIG.title,
    capable: true,
  },
  // <meta name="google-site-verification" content="-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk" />
  verification: {
    // google: 'YXX_WFs2UUKUX0hoW9cYgZsaKYARrlvneVgGWm7eGx8',
    google: process.env.NEXT_PUBLIC_MODE_PRODUCTION ? '-SD7kSWHZKEXxbtkWRvn1r5wtOy8o6Gv0wDuA_ituHk' : '',
    // me:'YXX_WFs2UUKUX0hoW9cYgZsaKYARrlvneVgGWm7eGx8'
  },
}

export const viewport: Viewport = {
  themeColor: 'white',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='vi'>
      <body
        className={clsx(
          // inter.variable,
          // notoSans.variable,
          // monomaniacOne.variable,
          'bg-web-main dark:bg-slate-900 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-900 dark:to-blue-900'
        )}
      >
        <ReactQueryProvider>
          <StyledComponentsRegistry>
            <HeroUIProvider themeProps={{ attribute: 'class', defaultTheme: 'light' }}>
              <ClientRender>{children}</ClientRender>
            </HeroUIProvider>
          </StyledComponentsRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
