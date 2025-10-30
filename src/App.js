import './App.css';
import Heropage from './Pages/Heropage';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import ProductDetails from './MyComponent/ProductDetails';
import Cart from './MyComponent/Cart';
import { Toaster } from 'react-hot-toast';
import ProductListing from './MyComponent/common/ProductListing';
import BrandPage from './Pages/BrandPage';
function App() {




  return (
    <div className='w-screen min-h-screen relative bg-gray-50'>
   <Routes>
     <Route path='/' element={<Home/>}/> 
     <Route path="/product-details" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/product-listing" element={<ProductListing/>} />
<Route path="/brand/:brandName" element={<BrandPage />} />


      </Routes>
<Toaster 
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: {
      background: '#fff',
      color: '#333',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    },
  }}
/>
    </div>
  );
}

export default App;