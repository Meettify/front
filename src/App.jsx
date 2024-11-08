import './App.css'
import React from 'react';
import { RouterProvider } from 'react-router-dom'
import root from './routers/root';
import useNotificationSSE from './hooks/useNotificationSSE';

function App() {
  useNotificationSSE();

  return (
    <RouterProvider router={root} />
  );
}

export default App;
