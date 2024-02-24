import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Cart } from './pages/Cart'
import { ProductDetail } from './pages/ProductDetail'
import {Navbar} from './components/Navbar'
import './App.css'
import { Footer } from './components/Footer'

function App() {
  return (
    <BrowserRouter>     
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
        </Routes>   
      <Footer />     
    </BrowserRouter>
  )
}

export default App
