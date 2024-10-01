import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { store } from './redux_store/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Main />} />
      </Routes>
      </BrowserRouter>
    </Provider>

  </StrictMode>
)
