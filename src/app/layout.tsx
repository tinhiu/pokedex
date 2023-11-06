'use client'
import { QueryClientProvider, QueryClient } from 'react-query';

import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from '@/components/theme-provider'

import './custom.css';
import './globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AnimatePresence>
            <ThemeProvider attribute="class" defaultTheme="light">
              {children}
            </ThemeProvider>
          </AnimatePresence>
        </QueryClientProvider>
      </body>
    </html>
  )
}
