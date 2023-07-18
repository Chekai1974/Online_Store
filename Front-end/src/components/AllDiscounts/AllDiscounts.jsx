import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapPage from "../Map/MapPage";
import axios from "axios";

function AllDiscounts() {
  const [allProducts, setAllProducts] = useState([]);
  const [discountsProducts, setDiscountsProducts] = useState([]);
  const [priceFromTo, setPriceFromTo] = useState([]);

  const [option, setOption] = useState("default");

  // get all products
  useEffect(() => {
    async function getProductsfromCategories() {
      try {
        const response = await axios.get(`http://localhost:3333/products/all`);
        setAllProducts(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    getProductsfromCategories();
  }, []);

  useEffect(() => {
    setDiscountsProducts(allProducts.filter((elem) => elem.discont_price));
  }, [allProducts]);

  // navigation to one product
  const navigation = useNavigate();
  function goToProduct(id) {
    navigation(`/products/${id}`);
  }

  function fitersPrice(event) {
    let priceFrom = parseFloat(event.target.from.value) || 0;
    let priceTo = parseFloat(event.target.to.value) || 99999999999999;

    const doneFilters = discountsProducts.filter((elem) => {
      if (elem.discont_price) {
        return elem.discont_price >= priceFrom && elem.discont_price <= priceTo;
      } else {
        return elem.price >= priceFrom && elem.price <= priceTo;
      }
    });
    setPriceFromTo(doneFilters);
  }

  const handleSubmitFilterPrices = (event) => {
    event.preventDefault();
    fitersPrice(event);
  };

  //calculator of sales
  const calculateDiscount = (price, discontPrice) => {
    const discount = price - discontPrice;
    const discountNew = (discount / price) * 100;
    return discountNew.toFixed(0);
  };

  useEffect(() => {
    let optionDiscountsProducts = [...discountsProducts];
    let optionPriceFromTo = [...priceFromTo];
    if (option === "low") {
      optionPriceFromTo.sort((a, b) => {
        const priceA = a.discont_price;
        const priceB = b.discont_price;
        return priceA - priceB;
      });
      optionDiscountsProducts.sort((a, b) => {
        const priceA = a.discont_price;
        const priceB = b.discont_price;
        return priceA - priceB;
      });
    } else if (option === "hight") {
      optionPriceFromTo.sort((a, b) => {
        const priceA = a.discont_price;
        const priceB = b.discont_price;
        return priceB - priceA;
      });
      optionDiscountsProducts.sort((a, b) => {
        const priceA = a.discont_price;
        const priceB = b.discont_price;
        return priceB - priceA;
      });
    }
    setPriceFromTo(optionPriceFromTo);
    setDiscountsProducts(optionDiscountsProducts);
  }, [option]);

  function sortPrice(e) {
    e.preventDefault();
    setOption(e.target.value);
  }

  const renderProductCard = (elem) => {
    if (elem.discont_price) {
      return (
        <div className="product-one-card" key={elem.id}>
          <img
            src={`http://localhost:3333/${elem.image}`}
            alt=""
            onClick={() => goToProduct(elem.id)}
          />
          <div className="products-prices">
            <h2 id="product-new-price">{elem.discont_price}$</h2>
            <h2 id="product-first-price" className="discounted">
              {elem.price}$
            </h2>
            <h2 id="product-discount">
              {calculateDiscount(elem.price, elem.discont_price)}%
            </h2>
          </div>
          <p>{elem.title}</p>
        </div>
      );
    }
  };
  return (
    <section className="discounts-products">
      <div className="container-discounts-products">
        <div className="content-discounts-products">
          <form className="filter-menu" onSubmit={handleSubmitFilterPrices}>
            <h1>Tools and equipment</h1>
            <div className="filters">
              <div className="filter-price">
                <h3>Price</h3>
                <input type="text" name="from" placeholder="from" id="from" />
                <input type="text" name="to" placeholder="to" id="to" />
                <button className="filter-btn">Get</button>
              </div>
              <div className="filter-sorted">
                <h3>Sorted</h3>
                <select value={option} onChange={sortPrice}>
                  <option value="default">Default</option>
                  <option value="low">Prise: low to hight</option>
                  <option value="hight">Prise: hight to low</option>
                </select>
              </div>
            </div>
          </form>
          <div className="products-cards">
            {priceFromTo.length > 0
              ? priceFromTo.map((elem) => {
                  return renderProductCard(elem);
                })
              : discountsProducts.map((elem) => {
                  return renderProductCard(elem);
                })}
          </div>
        </div>
      </div>
      <MapPage></MapPage>
    </section>
  );
}

export default AllDiscounts;
