import "nes.css/css/nes.css";
import "./globals.css";
import { Press_Start_2P, Doto } from 'next/font/google';

const press_start = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start',
});

const doto = Doto({
  weight: ['900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-doto',
});

export const metadata = {
  icons: {
    icon: [
      {
        url: '/light-icon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/dark-icon.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
  title: {
    default: 'SPIT Hackathon 2025 | CSI-SPIT',
  },
  description: 'Join us for the SPIT Hackathon 2025!',
  keywords: [
    'SPIT Hackathon 2025',
    'Hackathon',
    'CSI-SPIT',
    'Computer Society of India',
    'Sardar Patel Institute of Technology',
    'Student Chapter',
    'Technology Workshops',
    'Tech Events',
  ],
  authors: [{ name: 'CSI-SPIT Technical Team' }],
  creator: 'CSI-SPIT Student Chapter',
  publisher: 'Sardar Patel Institute of Technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${press_start.variable} ${doto.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
