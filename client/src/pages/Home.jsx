import React, { useEffect, useState } from 'react'
import { axiosJWT } from '../apiCalls';
import Product from '../components/Product';
import axios from 'axios';
const Home = () => {
    const[product,setProduct] = useState([]);
    useEffect(()=>{
        const getdata=async()=>{
            const res = await axios.get(
              "http://127.0.0.1:4400/api/products/all_products"
            );
            console.log("The Data",res.data)
            setProduct(res.data.data)
        }
        getdata()
    },[])
  return (
    <div className='flex flex-wrap px-10 gap-5'>
      {product.map((pr, idx) => {
        return <Product product_data={pr} key={idx} />;
      })}
    </div>
  );
}

export default Home