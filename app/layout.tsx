import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TelegramFloatingButton from '@/components/TelegramFloatingButton';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://gopustak.in'),
  title: 'UPSC EPFO APFC Ebooks 2026 | GoPustak',
  description:
    'Focused ebooks for UPSC EPFO and APFC preparation — preparation strategy, special-subject notes and mock-test practice resources.',
  keywords: [
    'UPSC EPFO',
    'APFC 2026',
    'EPFO Study Guide',
    'Labour Laws EPFO',
    'Social Security in India',
    'GAAP Accounting Notes',
    'Auditing Insurance EPFO',
    'EPFO Mock Tests',
    'GoPustak',
  ],
  authors: [{ name: 'GoPustak' }],
  openGraph: {
    title: 'UPSC EPFO APFC Ebooks 2026 | GoPustak',
    description:
      'Focused ebooks for UPSC EPFO and APFC preparation — preparation strategy, special-subject notes and mock-test practice resources.',
    url: 'https://gopustak.in',
    siteName: 'GOPUSTAK.IN',
    type: 'website',
    images: [
      {
        url: '/covers/cover-product-2.png',
        width: 1200,
        height: 630,
        alt: 'GoPustak UPSC EPFO APFC Ebooks',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G8HLNBM7XE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-G8HLNBM7XE');
          `}
        </Script>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Schema JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'GOPUSTAK.IN',
              description: 'Premium Ebooks for UPSC EPFO / APFC Aspirants',
              url: 'https://gopustak.in',
              brand: {
                '@type': 'Brand',
                name: 'GoPustak',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <TelegramFloatingButton />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
