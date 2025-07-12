  import '../i18n.js'; 
  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.jsx'
  import { HeroUIProvider } from "@heroui/react";
  import {ToastProvider} from "@heroui/toast";


  createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HeroUIProvider>
  <ToastProvider />
  <App />
  </HeroUIProvider>
  </StrictMode>,
)
