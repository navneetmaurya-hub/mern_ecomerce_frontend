import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext.jsx';
import RelatedProduct from './RelatedProduct.jsx';

const ProductDetail = () => {
     const {
    cart,
    decreaseProductQty,
    addToCart,
    removeFromCart,
    userAddress,
    user,
    clearCart,
  } = useContext(AppContext);
  
  const [price, setPrice] = useState(0);
    const {id}=useParams(); 
    const navigate = useNavigate();
    // const [product,setProduct]=useState([]);
    const [product,setProduct]=useState(null);
    const url="https://mern-ecommerce-backend1-zlf7.onrender.com/api";  

    // useEffect(() => {

    //     console.log("hello");
    //     const fetchProduct = async () => {
    //         const api=await axios.get(`${url}/products/${id}`,{
    //           headers:{
    //             'Content-Type': 'application/json',
    //           },
    //           withCredentials:true 
    //         });
           
    //         setProduct(api.data.product);
    //         setPrice(api.data.product.price);
    //     };
    //     fetchProduct();
    // },[id,url]);
    //  
   

 
useEffect(() => {
    const fetchProduct = async () => {
        try {
            const api = await axios.get(`${url}/products/${id}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setProduct(api.data.product);
            setPrice(api.data.product.price);
        } catch (err) {
            console.log("Error aaya:", err);
        }
    };
    fetchProduct();
}, [id, url]);
 

// 
  const handlePayment=async ()=>{
    try{
       const orderResponse= await axios.post(`${url}/payment/checkout`,{
        amount:price,
         
      });
       console.log("Order Response:", orderResponse.amount);
       const { orderId, amount:orderAmount } = orderResponse.data;
       var options = {
        key: "rzp_live_TeYAGsUAUzu1oq", // Replace with your Razorpay key ID
        amount: orderAmount * 100, // Amount in paise
        currency: "INR",  
        name: "E-commerce Mastery",
        description: "Test Transaction",
        order_id: orderId, // Pass the order ID received from the server  
        handler: async function (response) {
          const paymentData = {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature, 
            amount: orderAmount,
            orderItems: cart?.items,
            userShipping: userAddress,
            userId: user?._id,
          }
          const api=await axios.post(`${url}/payment/verify-payment`,paymentData);
          if(api.data.sucess){
            alert("Payment Successful");
            clearCart();
            navigate("/orderconfirmation");
          }
          
          
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        notes: {
          address: userAddress?.address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();  
    }
    catch(error){
      console.error("Error during payment:", error);
    }
 }

 if (!product) return <h3 className="text-center text-light my-5">Loading...</h3>;

//  
  return (
      <>  
       
       <div className="container">
            <div className="container text-center my-5" style={{ display: 'flex', justifyContent: 'space-evenly', alignItem: 'center' }}>
              <div className="left">
                  <img src={product?.imgSrc} alt="" style={{ height: '200px', width: '200px', borderRadius: '10px', border: '2px solid yellow' }}></img>
              </div>
              <div className="right">
                  <h1>{product?.title}</h1>
                  <p>{product?.description}</p>
                  <h1>{product?.price} {""} {"₹"}</h1>

                  <div className="my-5">
                      <button className='btn btn-danger mx-3'
                       onClick={handlePayment}
                       >Buy Now</button>
                      {/* <button className='btn btn-warning mx-3'>Add To Cart</button> */}
                      <button className="btn btn-warning" onClick={() => addToCart(product._id, product.title, product.price, 1, product.imgSrc)}>
                      Add To Cart
                    </button>
                  </div>
              </div>
          </div>
        </div>
       <RelatedProduct category={product?.category} />
          
      </>
  );
};
  

export default ProductDetail;
