import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapPage from "../Map/MapPage";

function AllProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [priceFromTo, setPriceFromTo] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
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


  // navigation to one product
  const navigation = useNavigate();
  function goToProduct(id) {
    navigation(`/products/${id}`);
  }

  //checkbox
  const checkboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  function fitersPrice(event) {
    let priceFrom = parseFloat(event.target.from.value) || 0;
    let priceTo = parseFloat(event.target.to.value) || 99999999999999;

    const doneFilters = allProducts.filter((elem) => {
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
    let optionAllProducts = [...allProducts];
    let optionPriceFromTo = [...priceFromTo];
    if (option === "low") {
      optionPriceFromTo.sort((a, b) => {
        const priceA = a.discont_price || a.price;
        const priceB = b.discont_price || b.price;
        return priceA - priceB;
      });
      optionAllProducts.sort((a, b) => {
        const priceA = a.discont_price || a.price;
        const priceB = b.discont_price || b.price;
        return priceA - priceB;
      });
    } else if (option === "hight") {
      optionPriceFromTo.sort((a, b) => {
        const priceA = a.discont_price || a.price;
        const priceB = b.discont_price || b.price;
        return priceB - priceA;
      });
      optionAllProducts.sort((a, b) => {
        const priceA = a.discont_price || a.price;
        const priceB = b.discont_price || b.price;
        return priceB - priceA;
      });
    }
    setPriceFromTo(optionPriceFromTo);
    setAllProducts(optionAllProducts);
  }, [option]);

  function sortPrice(e) {
    e.preventDefault();
    setOption(e.target.value);
  }

  const renderProductCard = (elem) => {
    if (!isChecked) {
      return (
        <div className="product-one-card" key={elem.id}>
          <img
            src={`http://localhost:3333/${elem.image}`}
            alt=""
            onClick={() => goToProduct(elem.id)}
          />
          <div className="products-prices">
            {elem.discont_price ? (
              <>
                <h2 id="product-new-price">{elem.discont_price}$</h2>
                <h2 id="product-first-price" className="discounted">
                  {elem.price}$
                </h2>
                <h2 id="product-discount">
                  {calculateDiscount(elem.price, elem.discont_price)}%
                </h2>
              </>
            ) : (
              <h2 id="product-normal-price" style={{ textAlign: "center" }}>
                {elem.price}$
              </h2>
            )}
          </div>
          <p>{elem.title}</p>
        </div>
      );
    } else {
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
    }
  };
  return (
    <section className="all-products">
      <div className="container-all-products">
        <div className="content-all-products">
          <form className="filter-menu" onSubmit={handleSubmitFilterPrices}>
            <h1>All products</h1>
            <div className="filters">
              <div className="filter-price">
                <h3>Price</h3>
                <input type="text" name="from" placeholder="from" id="from" />
                <input type="text" name="to" placeholder="to" id="to" />
                <button className="filter-btn">Get</button>
              </div>
              <div className="filter-discount">
                <h3>Discounted items</h3>
                <input
                  type="checkbox"
                  name="discount"
                  id="checkbox"
                  checked={isChecked}
                  onChange={checkboxChange}
                />
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
              : allProducts.map((elem) => {
                  return renderProductCard(elem);
                })}
          </div>
        </div>
      </div>
      <MapPage></MapPage>
    </section>
  );
}

export default AllProducts;
