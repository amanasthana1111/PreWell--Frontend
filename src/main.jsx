
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/BeforeAuth/context/userContext.jsx";


createRoot(document.getElementById("root")).render(
  
    <BrowserRouter>
    <AuthProvider>
        <App />
    </AuthProvider>
      
    </BrowserRouter>
);
