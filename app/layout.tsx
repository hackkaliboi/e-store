import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'DC Chickin | Premium Clothing Store',
    template: '%s | DC Chickin'
  },
  description: 'Discover premium quality clothing at DC Chickin. Shop our curated collection of stylish apparel for men and women.',
  keywords: ['clothing store', 'fashion', 'premium clothing', 'apparel', 'style', 'DC Chickin'],
  authors: [{ name: 'DC Chickin' }],
  creator: 'DC Chickin',
  publisher: 'DC Chickin',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  alternates: {
    canonical: 'https://www.dcchickin.com'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.dcchickin.com',
    title: 'DC Chickin | Premium Clothing Store',
    description: 'Discover premium quality clothing at DC Chickin. Shop our curated collection of stylish apparel for men and women.',
    siteName: 'DC Chickin',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DC Chickin - Premium Clothing Store'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DC Chickin | Premium Clothing Store',
    description: 'Discover premium quality clothing at DC Chickin. Shop our curated collection of stylish apparel for men and women.',
    images: ['/twitter-image.jpg'],
    creator: '@dcchickin'
  },
  verification: {
    google: ''
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}