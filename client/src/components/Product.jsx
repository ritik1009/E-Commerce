import { useNavigate } from "react-router-dom"
const Product = ({product_data}) => {
    const navigate = useNavigate()
    const handleClick = (e)=>{
        navigate(`/details/${product_data._id}`)
    }
  return (
    <div className='bg-slate-100 flex flex-col justify-center p-2' onClick={handleClick}>
        <img src={product_data.images} alt="" className="h-44 w-44" />
        <p className="font-bold">{product_data.name}</p>
        <p>{product_data.price}</p>
    </div>
  )
}

export default Product