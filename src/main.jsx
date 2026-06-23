import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faBars, faCartShopping,
        faMagnifyingGlass, faAngleDown, faArrowLeft, faArrowRight,
        faPlus, faMinus, faTrashCan  
         } from "@fortawesome/free-solid-svg-icons";
import App from './App.jsx';

library.add(faBars, faMagnifyingGlass, faAngleDown, 
            faCartShopping, faArrowLeft, faArrowRight,
            faPlus, faMinus, faTrashCan);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
