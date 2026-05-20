import { Fragment, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from './App.jsx';
// Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "react-toastify/dist/ReactToastify.css";
// Custom CSS
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Fragment>
        <App />
        <ToastContainer position="top-right" autoClose={2800} closeOnClick pauseOnHover />
      </Fragment>
    </BrowserRouter>
  </StrictMode>,
)
