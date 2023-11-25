import Navbar from '@/components/Navbar'
import './globals.css'
import Footer from '@/components/Footer'
import CartProvider from '../providers/CartProvider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const metadata = {
  title: 'eShop | Home',
  description: 'eShop is an online e-commerce website where you can buy mobile phones & accessories at a great price.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 0
  },
  themeColor: 'rgb(37 99 235)'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className='max-w-[100vw]'  >
        <CartProvider>
          <Navbar />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <div className='max-w-[100vw] min-h-[55px]'></div>
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
