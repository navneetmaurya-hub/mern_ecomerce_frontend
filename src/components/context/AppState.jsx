import React, { useEffect, useState } from 'react';
import AppContext from './AppContext.jsx';
import axios from 'axios';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const AppState = (props) => {
    // const url="http://localhost:3000/api";
    const url="https://mern-ecomerce-backend-ed2x-ri35p0c9r-navneet-maurya.vercel.app/api";
    const [products,setProducts]=useState([]);
    const [token,settoken]=useState([]);
     const [isAuthenticated,setIsAuthenticated]=useState(false);
     const[filteredData,setfilteredData]=useState([]);
     const [user,setuser]=useState();
     const [cart,setcart]=useState([0]);
     const [reload,setreload]=useState(false);
     const [userAddress,setUserAddress]=useState("");
     const [userOrder,setUserOrder]=useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const api=await axios.get(`${url}/products/all`,{
              headers:{
                'Content-Type': 'application/json',
              },
              withCredentials:true 
            });
            setProducts(api.data.products);
            setfilteredData(api.data.products);
            userprofile();
        };
        fetchProduct();
        userCart();
        getAddress();
        user_Order();
    },[token]);

    useEffect(()=>{
     let lstoken=localStorage.getItem("token");
     if(lstoken){
       settoken(lstoken);
       setIsAuthenticated(true);
     }
    },[]);

    // register
    const register = async (name,email,password,confirmPassword) => {
            if(password!=confirmPassword){
              toast.success('Password not Match', {
                position: "top-center",
                autoClose: 1460,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
            }
            else{
              const api = await axios.post(`${url}/users/register`, { name, email, password, confirmPassword }, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true
              });
            
              toast.success(api.data.message, {
                position: "top-center",
                autoClose: 1460,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
              return api.data;
            } 
    };

    //Login 
    const userLogin = async (email,password) => {
            const api=await axios.post(`${url}/users/login`,{email,password},{
              headers:{
                'Content-Type': 'application/json',
              },
              withCredentials:true 
            });

      toast.success(api.data.message, {
        position: "top-center",
        autoClose: 1460,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      settoken(api.data.token);
      localStorage.setItem("token",api.data.token);
      setIsAuthenticated(true);
      return api.data; 
    };

    // logout user
    const logout=()=>{
      setIsAuthenticated(false);
      settoken(" ")
      localStorage.removeItem('token')
      toast.success("Logout sucessfully!", {
        position: "top-center",
        autoClose: 1460,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
     
    // user profile
    const userprofile = async () => {
            const api=await axios.get(`${url}/users/profile`,{
              headers:{
                'Content-Type': 'application/json',
                "Auth":token
              },
              withCredentials:true,
            });
           
            setuser(api.data.user);
          
        };

    //  add to cart
     const addToCart= async (productId, title, price, qty, imgSrc) => {
            const api=await axios.post(`${url}/cart/add`,
              {productId, title, price, qty, imgSrc},
             {
              headers:{
                'Content-Type': 'application/json',
                Auth:token
              },
              withCredentials:true 
            });
           setreload(!reload);
            toast.success(api.data.message, {
                position: "top-center",
                autoClose: 1460,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
        };

    // user cart
         const userCart = async () => {
            const api=await axios.get(`${url}/cart/user`,{
              headers:{
                'Content-Type': 'application/json',
                "Auth":token
              },
              withCredentials:true,
            });
            console.log(api.data.cart);
            setcart(api.data.cart);
          
        };

    // REMOVE QTY--
    const decreaseProductQty = async (productId, qty) => {
            const api=await axios.post(`${url}/cart/--qty`,{productId, qty},{
              headers:{
                'Content-Type': 'application/json',
                "Auth":token
              },
              withCredentials:true,
            });
           setreload(!reload);
            toast.success(api.data.message, {
                position: "top-center",
                autoClose: 1460,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
          
        };


    // REMOVE from cart
    const removeFromCart = async (productId) => {
            const api=await axios.delete(`${url}/cart/remove/${productId}`,{
              headers:{
                'Content-Type': 'application/json',
                "Auth":token
              },
              withCredentials:true,
            });
            setreload(!reload);
            toast.success(api.data.message,{
                position: "top-center",
                autoClose: 1460,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
          
        };


    // Clear cart
    const clearCart= async () => {
            const api=await axios.delete(`${url}/cart/clear`,{
              headers:{
                'Content-Type': 'application/json',
                "Auth":token
              },
              withCredentials:true,
            });
            setreload(!reload);
            toast.success(api.data.message,{
                position: "top-center",
                autoClose: 1460,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
          
        };

    // ADD Shipping Address
    const shippingAddress= async (fullName,address,city,state,country,pincode,phoneNumber) => {

            const api=await axios.post(`${url}/address/add`,{fullName,address,city,state,country,pincode,phoneNumber},{
              headers:{
                'Content-Type': 'application/json',
                "Auth":token
              },
              withCredentials:true,
            });
            setreload(!reload);
            toast.success(api.data.message,{
                position: "top-center",
                autoClose: 1460,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
             
            return api.data
        };

    // Get LATEST Shipping Address 
    const getAddress = async () => {
            const api=await axios.get(`${url}/address/get`,{
              headers:{
                'Content-Type': 'application/json',
                Auth:token
              },
              withCredentials:true 
            });
            setUserAddress(api.data.userAddress);
        };

        // getuser order
        const user_Order= async () => {
            const api=await axios.get(`${url}/payment/userorders`,{
              headers:{
                'Content-Type': 'application/json',
                Auth:token
              },
              withCredentials:true 
            });
           
            setUserOrder(api.data);
        };


  return (
    <AppContext.Provider value={{products,register,userLogin,url,token,settoken,isAuthenticated,setIsAuthenticated,filteredData,setfilteredData,logout,user,setuser,addToCart,userCart,cart,setcart,decreaseProductQty,removeFromCart,clearCart,shippingAddress,userAddress,userOrder}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;