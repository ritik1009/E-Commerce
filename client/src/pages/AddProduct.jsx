import { Alert } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import InputComponent from "../components/InputComponent";
import { useNavigate, useParams } from "react-router-dom";
import { axiosJWT } from "./../apiCalls";

const AddProduct = () => {
  const { id } = useParams();
  const name = useRef();
  const description = useRef();
  const images = useRef();
  const price = useRef();
  const pr_Id = useRef();
  const pr_type = useRef();
  const status = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      const getdata = async () => {
        const res = await axios.get(
          `http://127.0.0.1:4400/api/products/product_details/${id}`
        );
        const ProductDetail = res.data.data;
        name.current.value = ProductDetail.name;
        description.current.value = ProductDetail.description;
        images.current.value = ProductDetail.images;
        price.current.value = ProductDetail.price;
        pr_Id.current.value = ProductDetail.pr_Id;
        pr_type.current.value = ProductDetail.pr_type;
        status.current.value = ProductDetail.status;
      };
      getdata();
    }
  }, []);
  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const product = {
      name: name.current.value,
      description: description.current.value,
      images: images.current.value,
      price: price.current.value,
      pr_Id: pr_Id.current.value,
      pr_type: pr_type.current.value,
      status: status.current.value,
    };
    try {
        if(id){
            await axiosJWT.put(
              `http://127.0.0.1:4400/api/product/modify_product/${id}`,
              {product:product}
            );
        }else{
            await axiosJWT.post(
              "http://127.0.0.1:4400/api/product/add_product",
              product
            );
        }
      
      navigate("/home");
    } catch (err) {
      <Alert severity="error">There was an error.</Alert>;
    }
    setLoading(false);
  }
  return (
    <div className="flex flex-col py-10 gap-5 w-[50%] bg-slate-100 mx-auto items-center">
      <h1 className="text-center text-3xl font-bold">Add Product</h1>
      <form className="flex flex-col gap-5 w-2/3 p-2" onSubmit={handleSubmit}>
        {error ? <p>{error}</p> : null}
        <div className="flex flex-col gap-3 justify-between">
          <InputComponent
            ref_={name}
            elem_id={name}
            label_name={"Product Name"}
          />
          <InputComponent
            ref_={description}
            elem_id={description}
            label_name={"Description"}
          />
          <InputComponent
            ref_={images}
            elem_id={images}
            label_name={"Image Url"}
          />
          <InputComponent ref_={price} elem_id={price} label_name={"Price"} />
          <InputComponent
            ref_={pr_Id}
            elem_id={pr_Id}
            label_name={"Product Id"}
          />
          <InputComponent
            ref_={pr_type}
            elem_id={pr_type}
            label_name={"Product Type"}
          />
          <InputComponent
            ref_={status}
            elem_id={status}
            label_name={"Status"}
          />

          {!loading ? (
            <button
              type="submit"
              className="bg-green-500 h-10 text-xl font-semibold mt-3 text-white rounded-lg"
            >
              {id?"Edit Product":"Add Product"}
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 h-10 text-xl font-semibold mt-3 text-white rounded-lg"
              disabled
            >
              Loading..
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
