import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import RegisterModal from '@/components/modals/RegsiterModal'
import LoginModal from '@/components/modals/LoginModal'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import EditModal from '@/components/EditModal'



export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <RegisterModal />
      <LoginModal />
      <Layout><Component {...pageProps} /></Layout>
    </SessionProvider>
  )
}
