import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from '../context/AuthContext';
import { axiosJWT } from '../apiCalls';

const ProductDetails = () => {
    const {id} = useParams();
    const [productDetail, setProductDetail] = useState([]);
    const [adding,setAdding] = useState(false)
    const {cart, dispatch,user } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
      const getdata = async () => {
        const res = await axios.get(
          `http://127.0.0.1:4400/api/products/product_details/${id}`
        );
        console.log("The Data", res.data);
        setProductDetail(res.data.data);
      };
      getdata();
    }, []);
    const handleCart=async()=>{
        setAdding(true)
        console.log("Add_to_cart")
        if(user){
            try{
                await axiosJWT.post(`http://127.0.0.1:4400/api/cart/add_to_cart/${id}`)
            }catch(error){
                console.log("This Error",error)
            }
            
        }else{
            dispatch({
              type: "ADD_TO_CART",
              payload: { product: { ...productDetail, quantity: 1 } },
            });
        }
        setAdding(false)
    }
    const handleBuy=()=>{
        console.log("Buy",cart)
    }
    const handleEdit = ()=>{
        navigate(`/addProduct/${id}`);
    }
    const handleDelete =async ()=>{
         await axiosJWT.delete(
           `http://127.0.0.1:4400/api/product/delete_product/${id}`,
         );
         navigate(-1);
    }
  return (
    <div className="w-[80%] mx-auto p-10 my-4 flex bg-slate-200 gap-10 justify-around">
      <img src={productDetail.images} alt="" className="h-72 w-72" />
      <div className="flex flex-col gap-3">
        <p className="text-4xl font-extrabold">{productDetail.name}</p>
        <p className="text-2xl font-bold text-green-700 py-5">
          <span className="text-red-600">&#8377;</span>
          {productDetail.price}
        </p>
        <div className="flex justify-between gap-3">
          <Button variant="contained" onClick={handleCart}>
            {adding ? "Adding" : "Add_to_cart"}
          </Button>
          <Button variant="contained" onClick={handleBuy} color="success">
            Buy Now
          </Button>
        </div>
        {user?.role === "admin" ? (
          <div className="flex  gap-3">
            <Button
              variant="contained"
              onClick={handleEdit}
              color="secondary"
            >
              Edit
            </Button>
            <Button variant="contained" onClick={handleDelete} color="error">
              Delete
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProductDetails