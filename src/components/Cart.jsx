import React, { useContext,useState,useEffect } from "react";
import AppContext from "./context/AppContext.jsx";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart ,decreaseProductQty,addToCart,removeFromCart,clearCart} = useContext(AppContext);
  const[price,setprice]=useState(0);
  const [qty, setQty] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    let qty = 0;
    let price = 0; 
    if(cart?.items){
      for(let i = 0; i < cart.items.length; i++){
        qty += cart.items[i].qty;
        price += cart.items[i].price * cart.items[i].qty;
      }
    }
    setprice(price);
    setQty(qty);
  },[cart]);
  


  return (

    <>
      {cart?.items?.length==0 ?(
        <>
        <div className="my-5 text-center">
            <button className="btn btn-warning mx-3" style={{ backgroundColor: 'lightgray', border: 'none', color: 'black' }} onClick={() => navigate('/')}>
              Continue Shopping...
            </button>
        </div>
        </>
      ):(
        <>
            <div className="my-5 text-center">
              <h2>Shopping Cart</h2>
              <button className="btn btn-warning mx-3" style={{ backgroundColor: 'lightgray', border: 'none', color: 'black' }}>Total Qty: {qty}</button>
              <button className="btn btn-primary mx-3" style={{ backgroundColor: 'lightgray', border: 'none', color: 'black' }}>Total Price: ₹{price.toFixed(2)}</button>
            </div>  
           </>
      )}
      
      {cart?.items?.map((product) => <div key={product._id} className='container p-3 bg-dark my-5 text-center'>
        <div style={{ display: 'flex', justifyContent: 'space-around' ,alignItems:'center'}}>
          <div  className="cart_img">
            <img src={product.imgSrc} alt="" style={{ width: '100px', height: '100px', borderRadius: '10px' }} />
          </div>
        
        <div className="cart_des">
          <h2>{product.title}</h2>
          <h3>{product.price}</h3>
          <h3>Qty :- {product.qty}</h3>
        </div>
        <div className="cart_action">
          <button className="btn btn-primary mx-3" onClick={()=> decreaseProductQty(product.productId,1)}>Qty--</button>
          <button className="btn btn-primary mx-3"  onClick={() => addToCart(product.productId, product.title, product.price/product.qty, 1, product.imgSrc)}>Qty++</button>
          <button className="btn btn-danger mx-3"  onClick={() =>{
            if(confirm("Are you sure you want to remove this item from the cart?")){
              removeFromCart(product.productId)}
            }}>Remove</button>
        </div>
        </div>
      </div>
      )}
      {cart?.items?.length>0 && (
         <div className="container text-center">
        <button className="btn btn-success" style={{ backgroundColor: 'green', border: 'none', color: 'white' }} onClick={()=> navigate('/shipping')}> Proceed</button>
        <button className="btn btn-danger mx-3" style={{ backgroundColor: 'red', border: 'none', color: 'white' }} onClick={() => {
          if(confirm("Are you sure you want to clear the cart?")){
            clearCart();
          }
        }}>Clear Cart</button>

      </div>
      )}
      
    </>
  );
};

export default Cart;