import React, { useState, useEffect } from 'react';
import Base from './Base';
import Card from './Card';
import {getProducts} from "./helper/coreapicalls";

const App = () => {

  const [products,setProducts] = useState([])
  const [error,setError] = useState(false)

  const loadAllProducts =()=>{
    getProducts()
    .then(data=>{
      if(data.error){
        setError(data.error);
      }else{
        setProducts(data);
      }
    })
  }

  useEffect(()=>{
    loadAllProducts();
  },[])
  return (
    <Base title="Homepage" description="Best Customized Tshirt Store" className="container theme-white text-black">
      <div className="row text-center">
        <h1 className="text-black">All Of Tshirts</h1>
        <div className="row">
          {products.map((product,index)=>{
            return(
              <div key={index} className="col-lg-3 mb-4 col-sm-12">
                <Card product={product}></Card>
              </div>
            )
          })}
        </div>
      </div>

    </Base>
  )
}

export default App;