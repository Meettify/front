import "./App.css";
import { React } from "react";
import { RouterProvider } from "react-router-dom";
import root from "./routers/root";
import useNotificationSSE from "./hooks/useNotificationSSE";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Toastify import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  useNotificationSSE();

  return (
    <QueryClientProvider client={queryClient}>
      {/* ✅ ToastContainer는 전역에서 한 번만 선언해 주세요 */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
      />
      <RouterProvider router={root} />
    </QueryClientProvider>
  );
}

export default App;
