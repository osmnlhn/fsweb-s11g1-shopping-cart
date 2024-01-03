import React, { useState,useEffect } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import ProductContext  from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState([]);



  const addItem = (item) => {
    setCart(prevProducts => [...prevProducts, item])
  };

  const removeItem=(itemId)=>{
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  }
useEffect(()=>{
  const storeCart=localStorage.getItem('cart');
  if(storeCart){
    setCart(JSON.parse(storeCart))
  }
},[])

useEffect (()=>{
  localStorage.setItem('cart',JSON.stringify(cart))
},[cart])

  return (
    <ProductContext.Provider value={{ products, addItem }}>
       <CartContext.Provider value={{ cart,removeItem }} >
    <div className="App">
      <Navigation cart={cart} />

      {/* Routelar */}
      <main className="content">
   
        <Route exact path="/">
          <Products products={products} addItem={addItem} />
        </Route>
        
       
        <Route path="/cart">
          <ShoppingCart cart={cart}  />
        </Route>
        
      </main>
    </div>
    </CartContext.Provider>
        </ProductContext.Provider>
  );
}

export default App;
