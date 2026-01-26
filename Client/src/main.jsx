import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
     <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      theme="colored"
    />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          borderRadius: "12px",
          background: "#fff",
          color: "#333",
        },
      }}
    />
  </StrictMode>
)
