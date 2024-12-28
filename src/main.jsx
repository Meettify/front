import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ChannelIOWidget from '../src/components/chatbot/ChannelIOWidget.jsx';
const pluginKey = '6fec18e9-6d40-4de2-85f6-77d6e598c79b';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ChannelIOWidget pluginKey={pluginKey} />
  </StrictMode>,
)
