import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/socket/socket.context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketProvider>
  </StrictMode>,
);
