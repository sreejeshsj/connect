import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";
import {ToastContainer} from 'react-toastify'
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ToastContainer/>
    <AppContextProvider>
      <App />
      
    </AppContextProvider>
  </BrowserRouter>
);
