import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router';
import {Toaster} from 'sonner';
import {HomePage} from "@/pages/HomePage.jsx";
import {NotFound} from "@/pages/NotFound.jsx";
function App() {

  return (
    <>
        <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
