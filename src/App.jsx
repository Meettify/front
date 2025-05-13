import "./App.css";
import { React } from "react";
import { RouterProvider } from "react-router-dom";
import root from "./routers/root";
import useNotificationSSE from "./hooks/useNotificationSSE";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  useNotificationSSE();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={root} />
    </QueryClientProvider>
  );
}

export default App;
