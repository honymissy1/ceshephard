import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {UserProvider} from './context/userContext';
import {AdminProvider} from './context/admin'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminProvider>
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={ <App />} /> 
      </Routes>
    </BrowserRouter>
    </UserProvider>
    </AdminProvider>
  </React.StrictMode>,
)
