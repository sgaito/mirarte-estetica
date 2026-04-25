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

const siteUrl = "https://mirarte-estetica.vercel.app"

/** 58 caracteres — rango recomendado OG/Twitter ~50–60. */
const shareTitle =
  "Mirarte Estética | Extensiones, lifting y cejas en Rosario"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mirarte Estética | Pestañas, Lifting y Belleza en Rosario",
    template: "%s | Mirarte Estética",
  },
  description:
    "Especialistas en extensiones de pestañas, lifting y cejas en Rosario. Realzá tu mirada con atención personalizada y profesional.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: siteUrl,
    title: shareTitle,
    description:
      "Especialistas en extensiones de pestañas, lifting y cejas en Rosario. Realzá tu mirada con atención personalizada y profesional.",
    images: [
      {
        url: "/metadatos-og.webp",
        width: 1200,
        height: 630,
        alt: "Mirarte Estética — Extensiones, lifting y cejas en Rosario. Reservá tu turno por WhatsApp.",
      },
    ],
    type: "website",
    locale: "es_AR",
    siteName: "Mirarte Estética",
  },
  twitter: {
    card: "summary_large_image",
    title: shareTitle,
    description:
      "Especialistas en extensiones de pestañas, lifting y cejas en Rosario. Realzá tu mirada con atención personalizada y profesional.",
    images: [`${siteUrl}/metadatos-og.webp`],
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
