import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { setupAxiosInterceptors } from './api/axiosInterceptors';

setupAxiosInterceptors();

createRoot(document.getElementById('root')).render(
  
    <App />
  
)
