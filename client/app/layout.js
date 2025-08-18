import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from './components/LayoutWrapper'
import {AppProvider} from './context/AppContext'
import { Toaster } from 'react-hot-toast'
import MotionProvider from './components/MotionProvider.js'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Car rental",
  description: "Carrental is easier secured and comfortable to book cars and list cars.",
  icons:{
    icon: '/favicon.svg'
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <AppProvider>
        <Toaster/>
        <LayoutWrapper>
          <MotionProvider viewport={{once: true}}>
            {children}
          </MotionProvider>
        </LayoutWrapper>
        </AppProvider>               
      </body>
    </html>
  );
}
