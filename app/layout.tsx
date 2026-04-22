import type { Metadata } from 'next'
import { Geist, Geist_Mono, Great_Vibes, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mirarte-estetica.pages.dev'),
  title: 'Mirarte Estética | Especialistas en Pestañas y Belleza',
  description: 'Mirarte Estética: Especialistas en extensiones de pestañas, lifting, cejas y tratamientos de belleza integral en Rosario. Realzá tu mirada con atención personalizada y profesional.',
  openGraph: {
    title: 'Mirarte Estética',
    description: 'Especialistas en extensiones de pestañas, lifting, cejas y tratamientos de belleza integral en Rosario. Realzá tu mirada con atención personalizada y profesional.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 1200,
        alt: 'Mirarte Estética',
      },
    ],
    type: 'website',
    locale: 'es_AR',
    siteName: 'Mirarte Estética',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mirarte Estética',
    description: 'Especialistas en extensiones de pestañas, lifting, cejas y tratamientos de belleza integral en Rosario. Realzá tu mirada con atención personalizada y profesional.',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`bg-background scroll-smooth ${greatVibes.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
