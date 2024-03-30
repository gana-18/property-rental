import React from 'react'
import '@/assets/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from '@/components/AuthProvider'
import { GlobalProvider } from '@/context/GlobalContext'
export const metadata={
    title: 'Property Rental | Find your next home or apartment for rent in the city of your choice.',
    description: 'Find your next home or apartment for rent in the city of your choice.',
    keywords: 'rental, property, apartment, home, house, city, rent, lease, real estate, property management',
}

const MainLayout = ({children}) => {
  return (
    <GlobalProvider>
    <AuthProvider>
      <html lang='en'>
        <body>
           <Navbar/>
           <main>{children}</main>
            <Footer/>
            <ToastContainer/>
        </body>
      </html>
    </AuthProvider>
    </GlobalProvider>
    
  )
}

export default MainLayout
