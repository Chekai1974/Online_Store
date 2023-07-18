import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearBasket, deleteProduct } from "../Actions/addtoCartAction";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MapPage from "../Map/MapPage";

function Basket() {
  const state = useSelector((state) => state);
  const [totalPrice, setTotalPrice] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    const calculateTotalPrice = () => {
      let total = 0;
      state.forEach((product) => {
        const productPrice = product.discont_price || product.price;
        total += productPrice * product.quantity;
      });
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [state]);

  const minusQuantity = (productId) => {
    const existingProductIndex = state.findIndex(
      (item) => item.id === productId
    );
    if (
      existingProductIndex !== -1 &&
      state[existingProductIndex].quantity > 1
    ) {
      const updatedState = [...state];
      updatedState[existingProductIndex].quantity -= 1;
      localStorage.setItem("basketProducts", JSON.stringify(updatedState));
      setTotalPrice(calculateTotalPrice(updatedState));
    }
  };

  const plusQuantity = (productId) => {
    const existingProductIndex = state.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      const updatedState = [...state];
      updatedState[existingProductIndex].quantity += 1;
      localStorage.setItem("basketProducts", JSON.stringify(updatedState));
      setTotalPrice(calculateTotalPrice(updatedState));
    }
  };

  const calculateTotalPrice = (products) => {
    return products.reduce((sum, obj) => {
      const productPrice = obj.discont_price || obj.price;
      return sum + productPrice * obj.quantity;
    }, 0);
  };

  async function sendOrder(event) {
    event.preventDefault();
    const phoneNumber = event.target.tel.value;
    try {
       const order_info = {
         id_order: Date.now(),
         total_sum: totalPrice,
         order_list: state,
         phone: phoneNumber, 
       };
      const response = await axios.post(
        "http://localhost:3333/order/send",
        order_info
      );
      event.target.reset()
      dispatch(clearBasket())
    } catch (error) {
      console.error(error.message);
    }
  }

  const canPlaceOrder = state.length > 0;

  const emptyList = () => {
    return (
      <div className="basket-empty">
        <h1>
          Your basket is empty!
          <span
            style={{
              textDecoration: "underline",
              color: "#339933",
              cursor: "pointer",
            }}
            onClick={() => navigation("/allProducts")}
          >
            Go to shopping
          </span>
        </h1>
      </div>
    );
  };
  return (
    <div className="cart-container">
      <div className="basket-content">
        <h1>Shopping cart</h1>
        <div className="basket-products">
          <div className="list-products">
            <p
              id="title"
              onClick={() => navigation("/")}
              style={{ cursor: "pointer" }}
            >
              Back to the store &#10132;
            </p>
            {state.length === 0
              ? emptyList()
              : state.map((elem, index) => {
                  return (
                    <div className="one-product" key={index}>
                      <img
                        src={`http://localhost:3333/${elem.image}`}
                        alt="product"
                      />
                      <div className="information">
                        <p>{elem.title}</p>
                        <div className="quantity">
                          <h1 id="minus" onClick={() => minusQuantity(elem.id)}>
                            -
                          </h1>
                          <p id="quantity">{elem.quantity}</p>
                          <h1 id="plus" onClick={() => plusQuantity(elem.id)}>
                            +
                          </h1>
                        </div>
                      </div>
                      <div className="price">
                        {elem.discont_price ? (
                          <>
                            <h2 id="product-new-price">
                              {elem.discont_price}$
                            </h2>
                            <h2 id="product-first-price">{elem.price}$</h2>
                          </>
                        ) : (
                          <h2 id="product-normal-price">{elem.price}$</h2>
                        )}
                        <h1
                          id="delete"
                          onClick={() => dispatch(deleteProduct(elem.id))}
                        >
                          &#215;
                        </h1>
                      </div>
                    </div>
                  );
                })}
          </div>
          <div className="order-details">
            <h1>Order details</h1>
            <div className="total-price">
              <h3>Total</h3>
              <p>{isNaN(totalPrice) ? "$" : String(`${totalPrice}$`)}</p>
            </div>
            <form onSubmit={sendOrder}>
              <input
                type="text"
                placeholder="Phone number"
                name="tel"
                required
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9+]/g, "");
                }}
              />
              <button
                className={`order-btn ${!canPlaceOrder ? "disabled" : ""}`}
                type="submit"
                disabled={!canPlaceOrder}
              >
                Order
              </button>
            </form>
          </div>
        </div>
      </div>
      <MapPage></MapPage>
    </div>
  );
}

export default Basket; 