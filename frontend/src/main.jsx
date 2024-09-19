import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './utils/store.js';

createRoot(document.getElementById('root')).render(
 <StrictMode>
    <CssBaseline/>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>
)
