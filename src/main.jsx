import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { MarketplaceProvider } from './context/MarketplaceContext';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MarketplaceProvider>
          <App />
        </MarketplaceProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
