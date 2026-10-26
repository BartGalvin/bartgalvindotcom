import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

if (import.meta.env.DEV) {
  const previewTheme = new URLSearchParams(window.location.search).get('theme');
  if (['graphite', 'oxblood'].includes(previewTheme)) {
    document.documentElement.dataset.theme = previewTheme;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
