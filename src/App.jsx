import './App.css'
import React from 'react';
import { RouterProvider } from 'react-router-dom'
import root from './routers/root';
import MyComponent from './MyComponent';

function App() {
  return (
    //<MyComponent>
      <RouterProvider router ={root} />
    //</MyComponent>
  );
}

export default App;
