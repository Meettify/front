import './App.css'
import React from 'react';
import { RouterProvider } from 'react-router-dom'
import root from './routers/root';
import useNotificationSSE from './hooks/useNotificationSSE';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const pluginKey = '6fec18e9-6d40-4de2-85f6-77d6e598c79b';

function App() {
  useNotificationSSE();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={root} />
    </QueryClientProvider>
  );
}

export default App;
