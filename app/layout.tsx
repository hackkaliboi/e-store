import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'De-chickins | Premium Clothing Store',
    template: '%s | De-chickins'
  },
  description: 'Discover premium quality clothing at De-chickins. Shop our curated collection of stylish apparel for men and women.',
  keywords: ['clothing store', 'fashion', 'premium clothing', 'apparel', 'style', 'De-chickins'],
  authors: [{ name: 'De-chickins' }],
  creator: 'De-chickins',
  publisher: 'De-chickins',
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
    canonical: 'https://www.de-chickins.com'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.de-chickins.com',
    title: 'De-chickins | Premium Clothing Store',
    description: 'Discover premium quality clothing at De-chickins. Shop our curated collection of stylish apparel for men and women.',
    siteName: 'De-chickins',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'De-chickins - Premium Clothing Store'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'De-chickins | Premium Clothing Store',
    description: 'Discover premium quality clothing at De-chickins. Shop our curated collection of stylish apparel for men and women.',
    images: ['/twitter-image.jpg'],
    creator: '@de-chickins'
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