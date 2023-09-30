import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Button } from '@mui/material'
import { axiosJWT } from '../apiCalls'
import axios from 'axios'

const Cart = () => {
    const{user,cart,dispatch} = useContext(AuthContext)
    const[cartdata,setCartdata] = useState([])
    const [loading,setLoading] = useState('false')
    useEffect(()=>{
        setLoading(true);
        const getData = async()=>{
            console.log("user",user)
            if(user){
                const res = await axiosJWT.get(
                  "http://127.0.0.1:4400/api/cart/"
                );
                console.log("Rest Data", res.data);
                res.data.map(async (pr,idx) => {
                  const rest_ = await axios.get(
                    `http://127.0.0.1:4400/api/products/product_details/${pr.product_id}`
                  );
                  let product__ = rest_.data.data
                  product__["id"] = idx
                  setCartdata([...cartdata,product__]);
                });
            }else{
                setCartdata(cart)
            }
        };
        getData()
        setLoading(false);
    },[user,cart])

    const handleRemove = async(id)=>{
        if(user){
            const res = await axiosJWT.delete(
              `http://127.0.0.1:4400/api/cart/add_to_cart/${id}`
            );
            console.log("Rest Data", res.data);
        }else{
            console.log(typeof id)
            const updated_cart = cart.filter(product=>product._id!== id)
            console.log(updated_cart)
            dispatch({ type: "UPDATE_CART", payload: updated_cart });
        }
    }
  return (
    <div className="flex flex-col gap-6 px-10 w-2/3 mx-auto">
      <p className="text-4xl font-bold">Cart</p>
      {!loading?
      <div className="flex flex-col gap-4">
        {cartdata?.map((ci, idx) => {
          return (
            <div className="flex gap-4 justify-between" key={idx}>
            <div className='flex w-1/2 gap-10'>
              <p>{idx + 1}.</p>
              <img src={ci.images} alt="" className="h-20 w-20" />
              <div className="flex flex-col">
                <p className="text-xl font-semibold">{ci.name}</p>
                <div className="flex gap-3">
                  <p>{ci.quantity}</p>
                  <p>{ci.price}</p>
                </div>
              </div>
              </div>
              <div>
                <Button variant="contained" color="error" onClick={()=>handleRemove(ci._id)}>Remove</Button>
              </div>
            </div>
          );
        })}</div>:"Loading..."}
      {!user ? (
        <Button disabled variant="contained">
          Buy Now
        </Button>
      ) : (
        <Button variant="contained">Buy Now</Button>
      )}
    </div>
  );
}

export default Cart