import axios from "axios";
import React, { useEffect, useState } from "react";
import MapPage from "../Map/MapPage";
import { useNavigate } from "react-router-dom";
function Catalogs() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    try {
      async function getAllGategories() {
        const response = await axios.get(
          "http://localhost:3333/categories/all"
        );
        setCategories(response.data);
      }
      getAllGategories();
    } catch (error) {
      console.error(error.message);
    }
  }, []);
  const navigation = useNavigate();
  function goToOneCatalog(id) {
    navigation(`/catalog/${id}`);
  }
  return (
    <div className="categories">
      <div className="container-categories">
        <h1>Categories</h1>
        <div className="cards-categories">
          {categories.map((elem) => {
            return (
              <div key={elem.id} className="card-categorie">
                <img
                  src={`http://localhost:3333/${elem.image}`}
                  alt="categories-img"
                  onClick={() => goToOneCatalog(elem.id)}
                />
                <p>{elem.title}</p>
              </div>
            );
          })}
        </div>
        <MapPage></MapPage>
      </div>
    </div>
  );
}

export default Catalogs;
