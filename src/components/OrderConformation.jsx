import React from 'react'
import AppContext from './context/AppContext.jsx';
import { useContext ,useEffect,useState} from 'react';
import ShowOrderProduct from './ShowOrderProduct.jsx';
import { useNavigate } from 'react-router-dom';

const OrderConformation = () => {
    const {userOrder}=useContext(AppContext);
    const [latestOrder,setLatestOrder]=useState({});
    const navigate=useNavigate();
    
    useEffect(() => {
        console.log("FULL USER ORDER:", userOrder);

        if (userOrder?.orders?.length > 0) {
            setLatestOrder(userOrder.orders[0]);
        }
    }, [userOrder]);

    console.log("order detail all",latestOrder);
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

       

      <div className="container my-5">
        <h1 className="text-center">
          Your order has been confirmed
        </h1>

        <h3 className="text-center">
          It will be delivered soon
        </h3>
      </div>

      <div className="checkout-container">
        <h1 className="checkout-title">
          Order Details
        </h1>

        <div className="checkout-wrapper">

          <div className="product-section">

            <div className="section-title">
              Order Items
            </div>

            <div className="table-wrapper">

              <table className="checkout-table">

                <thead>
                  <tr>
                    <th>Product Img</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>

                <tbody>

                  {latestOrder?.orderItems?.map((product) => (

                    <tr key={product._id || product.productId}>

                      <td>
                        <img
                          src={product.imgSrc}
                          alt={product.title}
                          className="product-image"
                        />
                      </td>

                      <td className="product-title">
                        {product.title}
                      </td>

                      <td>
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </td>

                      <td>
                        {product.qty}
                      </td>

                      <td>
                        ₹{(
                          Number(product.price) *
                          Number(product.qty)
                        ).toLocaleString("en-IN")}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

          <div className="address-section">

            <div className="section-title">
              Order Address
            </div>

            {latestOrder ? (

              <ul className="address-list">

                <li>
                  <strong>Order ID:</strong>{" "}
                  {latestOrder?.orderId}
                </li>

                <li>
                  <strong>Payment ID:</strong>{" "}
                  {latestOrder?.paymentId}
                </li>

                <li>
                  <strong>Payment Status:</strong>{" "}
                  {latestOrder?.payStatus}
                </li>

                <li>
                  <strong>Name:</strong>{" "}
                  {latestOrder?.userShipping?.fullName}
                </li>

                <li>
                  <strong>Phone:</strong>{" "}
                  {latestOrder?.userShipping?.phoneNumber}
                </li>

                <li>
                  <strong>Country:</strong>{" "}
                  {latestOrder?.userShipping?.country}
                </li>

                <li>
                  <strong>State:</strong>{" "}
                  {latestOrder?.userShipping?.state}
                </li>

                <li>
                  <strong>City:</strong>{" "}
                  {latestOrder?.userShipping?.city}
                </li>

                <li>
                  <strong>PinCode:</strong>{" "}
                  {latestOrder?.userShipping?.pincode ||
                    latestOrder?.userShipping?.pinCode}
                </li>

                <li>
                  <strong>Address:</strong>{" "}
                  {latestOrder?.userShipping?.address}
                </li>

              </ul>

            ) : (

              <div className="no-address">
                <p>No order found.</p>
              </div>

            )}

          </div>
          

        </div>

      </div>
      <div className="pay-container">

            <button
              className="proceed-btn"
              onClick={() =>
                navigate("/")
              }
             
             
            >
              GO tO Home
            </button>

          </div>
    </> 
  )
}

export default OrderConformation;