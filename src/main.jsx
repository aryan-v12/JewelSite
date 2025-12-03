import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2C2C2C',
            color: '#FFF8F0',
            fontFamily: 'Montserrat, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#FFF8F0',
            },
          },
          error: {
            iconTheme: {
              primary: '#e03333ff',
              secondary: '#FFF8F0',
            },
          },
        }}
      />
    </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
