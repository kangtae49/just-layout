import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {container} from "./inversify.config";
import {Provider} from "inversify-react";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider container={container}>
      <DndProvider backend={ HTML5Backend }>
      <App />
      </DndProvider>
    </Provider>
  </StrictMode>,
)
