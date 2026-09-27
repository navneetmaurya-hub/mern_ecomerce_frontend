import React, { useContext, useEffect, useState } from "react";
import AppContext from "./context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const {
    cart,
    decreaseProductQty,
    addToCart,
    removeFromCart,
    userAddress,
    url,
    user,
    clearCart,
  } = useContext(AppContext);

  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);

  const navigate = useNavigate();

  // Calculate total price and quantity
  useEffect(() => {
    let totalPrice = 0;
    let totalQty = 0;

    if (cart?.items?.length > 0) {
      cart.items.forEach((item) => {
        totalPrice += Number(item.price) * Number(item.qty);
        totalQty += Number(item.qty);
      });
    }

    setPrice(totalPrice);
    setQty(totalQty);
  }, [cart]);

  const handlePayment=async ()=>{
    try{
       const orderResponse= await axios.post(`${url}/payment/checkout`,{
        amount:price,
        qty:qty,
        cartItems:cart?.items,
        userShipping:userAddress,
        userId:user?._id,
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
 

  const address = userAddress; // Assuming userAddress is an object with address details
  console.log("User Address:", address);
  return (
    <>
      {/* ================= CSS ================= */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .checkout-container {
          width: 100%;
          max-width: 1100px;
          margin: 40px auto;
          padding: 0 15px;
          color: white;
        }

        .checkout-title {
          text-align: center;
          margin-bottom: 30px;
          font-size: 30px;
          font-weight: bold;
        }

        /* ================= MAIN BOX ================= */

        .checkout-wrapper {
          display: flex;
          width: 100%;
          gap: 5px;
          background: #000;
        }

        /* ================= PRODUCT SECTION ================= */

        .product-section {
          width: 65%;
          border: 2px solid #173e6b;
          background: #111;
          overflow: hidden;
        }

        /* ================= ADDRESS SECTION ================= */

        .address-section {
          width: 35%;
          border: 2px solid #173e6b;
          background: #111;
          color: white;
          overflow: hidden;
        }

        /* ================= SECTION TITLE ================= */

        .section-title {
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;

          color: white;
          font-weight: bold;
          font-size: 14px;

          border-bottom: 2px solid #173e6b;
          background: #111;
        }

        /* ================= TABLE ================= */

        .table-wrapper {
          width: 100%;
          overflow-x: auto;
        }

        .checkout-table {
          width: 100%;
          border-collapse: collapse;
          color: white;
          font-size: 13px;
        }

        .checkout-table th,
        .checkout-table td {
          border: 2px solid #173e6b;
          text-align: center;
          padding: 7px 5px;
        }

        .checkout-table th {
          background: #171717;
          font-weight: bold;
          height: 35px;
          white-space: nowrap;
        }

        .checkout-table td {
          height: 55px;
        }

        /* ================= PRODUCT IMAGE ================= */

        .product-image {
          width: 42px;
          height: 42px;
          object-fit: contain;
          background: white;
          border-radius: 3px;
        }

        /* ================= PRODUCT TITLE ================= */

        .product-title {
          font-weight: bold;
          white-space: nowrap;
        }

        /* ================= QUANTITY BUTTON ================= */

        .qty-btn {
          width: 28px;
          height: 28px;

          border-radius: 50%;
          border: 2px solid #ddd;

          background: transparent;
          color: white;

          font-size: 18px;
          font-weight: bold;

          cursor: pointer;

          display: inline-flex;
          align-items: center;
          justify-content: center;

          transition: 0.2s;
        }

        .qty-btn:hover {
          background: #087cf0;
          border-color: #087cf0;
        }

        .qty-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ================= REMOVE BUTTON ================= */

        .remove-btn {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 17px;

          transition: 0.2s;
        }

        .remove-btn:hover {
          transform: scale(1.2);
        }

        /* ================= TOTAL ROW ================= */

        .total-row {
          height: 50px;
          background: #111;
        }

        .total-label {
          display: inline-block;
          background: #087cf0;
          color: white;

          padding: 6px 15px;

          border-radius: 4px;

          font-weight: bold;
        }

        .total-price {
          display: inline-block;

          background: #ffc107;
          color: #000;

          padding: 6px 12px;

          border-radius: 4px;

          font-weight: bold;
        }

        .total-qty {
          display: inline-block;

          background: #00bde7;
          color: #000;

          padding: 6px 13px;

          border-radius: 4px;

          font-weight: bold;
        }

        /* ================= ADDRESS ================= */

        .address-list {
          margin: 12px 0;
          padding-left: 28px;
          padding-right: 12px;

          font-size: 13px;
          line-height: 1.5;

          list-style-type: disc;
        }

        .address-list li {
          margin-bottom: 3px;
        }

        .address-list strong {
          font-weight: bold;
        }

        /* ================= NO ADDRESS ================= */

        .no-address {
          text-align: center;
          padding: 30px 10px;
        }

        /* ================= SELECT ADDRESS ================= */

        .address-btn {
          background: #087cf0;
          border: none;

          color: white;

          padding: 8px 15px;

          border-radius: 4px;

          cursor: pointer;

          font-weight: bold;
        }

        .address-btn:hover {
          background: #0566c7;
        }

        /* ================= PAY BUTTON ================= */

        .pay-container {
          display: flex;
          justify-content: center;

          margin-top: 45px;
        }

        .proceed-btn {
          background: #777;
          color: white;

          border: none;
          border-radius: 5px;

          padding: 9px 16px;

          font-size: 15px;
          font-weight: bold;

          cursor: pointer;

          transition: 0.2s;
        }

        .proceed-btn:hover {
          background: #555;
        }

        /* ================= MOBILE ================= */

        @media (max-width: 900px) {

          .checkout-wrapper {
            flex-direction: column;
          }

          .product-section,
          .address-section {
            width: 100%;
          }

          .address-section {
            margin-top: 5px;
          }
        }

        @media (max-width: 600px) {

          .checkout-container {
            margin-top: 20px;
            padding: 0 8px;
          }

          .checkout-title {
            font-size: 24px;
          }

          .checkout-table {
            font-size: 11px;
          }

          .checkout-table th,
          .checkout-table td {
            padding: 5px 3px;
          }

          .product-title {
            white-space: normal;
            min-width: 100px;
          }

          .product-image {
            width: 35px;
            height: 35px;
          }

          .qty-btn {
            width: 25px;
            height: 25px;
            font-size: 16px;
          }

          .address-list {
            font-size: 12px;
          }

          .pay-container {
            margin-top: 25px;
          }
        }

      `}</style>


      {/* ================= CHECKOUT ================= */}

      <div className="checkout-container">

        <h1 className="checkout-title">
          Checkout
        </h1>


        {/* ================= PRODUCT + ADDRESS ================= */}

        <div className="checkout-wrapper">


          {/* ================= PRODUCT DETAILS ================= */}

          <div className="product-section">

            <div className="section-title">
              Product's Detail
            </div>

            <div className="table-wrapper">

              <table className="checkout-table">

                <thead>

                  <tr>
                    <th>Product Img</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Qty--</th>
                    <th>Qty++</th>
                    <th>remove</th>
                  </tr>

                </thead>


                <tbody>

                  {cart?.items?.map((product) => (

                    <tr key={product._id}>

                      {/* IMAGE */}

                      <td>
                        <img
                          src={product.imgSrc}
                          alt={product.title}
                          className="product-image"
                        />
                      </td>


                      {/* TITLE */}

                      <td className="product-title">
                        {product.title}
                      </td>


                      {/* PRICE */}

                      <td>
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </td>


                      {/* QTY */}

                      <td>
                        {product.qty}
                      </td>


                      {/* QTY -- */}

                      <td>

                        <button
                          className="qty-btn"
                          onClick={() =>
                            decreaseProductQty(
                              product.productId,
                              1
                            )
                          }
                          disabled={product.qty <= 1}
                        >
                          −
                        </button>

                      </td>


                      {/* QTY ++ */}

                      <td>

                        <button
                          className="qty-btn"
                          onClick={() =>
                            addToCart(
                              product.productId,
                              product.title,
                              Number(product.price),
                              1,
                              product.imgSrc
                            )
                          }
                        >
                          +
                        </button>

                      </td>


                      {/* REMOVE */}

                      <td>

                        <button
                          className="remove-btn"
                          onClick={() => {

                            if (
                              window.confirm(
                                "Are you sure you want to remove this item?"
                              )
                            ) {

                              removeFromCart(
                                product.productId
                              );

                            }

                          }}
                        >
                          🗑️
                        </button>

                      </td>

                    </tr>

                  ))}


                  {/* ================= TOTAL ================= */}

                  <tr className="total-row">

                    <td></td>

                    <td>
                      <span className="total-label">
                        Total
                      </span>
                    </td>

                    <td>
                      <span className="total-price">
                        ₹{price.toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td>
                      <span className="total-qty">
                        {qty}
                      </span>
                    </td>

                    <td></td>
                    <td></td>
                    <td></td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>


          {/* ================= SHIPPING ADDRESS ================= */}

          <div className="address-section">

            <div className="section-title">
              Shipping Address
            </div>


            {address ? (

              <ul className="address-list">

                <li>
                  <strong>Name :</strong>{" "}
                  {address.fullName}
                </li>

                <li>
                  <strong>Phone :</strong>{" "}
                  {address.phoneNumber}
                </li>

                <li>
                  <strong>Country :</strong>{" "}
                  {address.country}
                </li>

                <li>
                  <strong>State :</strong>{" "}
                  {address.state}
                </li>

                <li>
                  <strong>City :</strong>{" "}
                  {address.city}
                </li>

                <li>
                  <strong>PinCode :</strong>{" "}
                  {address.pincode ||
                    address.pinCode}
                </li>

                <li>
                  <strong>Address :</strong>{" "}
                  { 
                    address.address}
                </li>

               

              </ul>

            ) : (

              <div className="no-address">

                <p>
                  No shipping address selected.
                </p>

                <button
                  className="address-btn"
                  onClick={() =>
                    navigate("/shipping")
                  }
                >
                  Select Address
                </button>

              </div>

            )}

          </div>

        </div>


        {/* ================= PROCEED TO PAY ================= */}

        {cart?.items?.length > 0 && address && (

          <div className="pay-container">

            <button
              className="proceed-btn"
              // onClick={() =>
              //   navigate("/payment")
              // }
              onClick={handlePayment}
             
            >
              Proceed To Pay
            </button>

          </div>

        )}

      </div>
    </>
  );
};

export default Checkout;