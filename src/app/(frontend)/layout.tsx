import React from 'react'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { BackToTop } from '@/components/shared/BackToTop'
import './styles.css'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.desagongseng.site'),
  title: 'Website Profil & Informasi Desa Gongseng',
  description: 'Pusat Informasi dan Pelayanan Publik Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang, Jawa Timur.',
  icons: {
    icon: '/images/logo-kabupaten-jombang.png',
    shortcut: '/images/logo-kabupaten-jombang.png',
    apple: '/images/logo-kabupaten-jombang.png',
  },
  openGraph: {
    title: 'Website Profil & Informasi Desa Gongseng',
    description: 'Pusat Informasi dan Pelayanan Publik Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang, Jawa Timur.',
    url: 'https://www.desagongseng.site',
    siteName: 'Website Profil & Informasi Desa Gongseng',
    images: [
      {
        url: '/images/logo-kabupaten-jombang.png',
        width: 600,
        height: 600,
        alt: 'Logo Kabupaten Jombang - Desa Gongseng',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Website Profil & Informasi Desa Gongseng',
    description: 'Pusat Informasi dan Pelayanan Publik Desa Gongseng, Kecamatan Megaluh, Kabupaten Jombang, Jawa Timur.',
    images: ['/images/logo-kabupaten-jombang.png'],
  },
  verification: {
    google: 'google1b666ff075e8c962',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
