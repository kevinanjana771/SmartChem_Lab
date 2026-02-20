import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const GOOGLE_CLIENT_ID = "100592810154-17ocsidt6n1rvj46m77isvkus06hmbsk.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
     </GoogleOAuthProvider>
  </StrictMode>
);
