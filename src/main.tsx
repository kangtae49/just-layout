import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {container} from "./inversify.config";
import {Provider} from "inversify-react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider container={container}>
      <App />
    </Provider>
  </StrictMode>,
)
