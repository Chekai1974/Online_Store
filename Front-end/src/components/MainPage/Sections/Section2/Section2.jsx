import React, { useEffect, useState } from 'react'
import axios from "axios"
import AllCategoriesLinkBtn from './AllCategoriesLinkBtn'
import { useNavigate } from 'react-router-dom'

function Section2() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    try { 
      async function getAllGategories() {
        const response = await axios.get('http://localhost:3333/categories/all')
        setCategories(response.data)
      }
      getAllGategories()
    } catch(error) {
      console.error(error.message);
    }

  }, [])

  const navigation = useNavigate()
  function goToOneCatalog(id) {
    navigation(`/catalog/${id}`)
  }
  return (
    <section className='section2'>
      <div className='container-section2'>
        <div className='content-section2'>
          <div className='catgeries-top-bar-section2'>
            <h3>Catalog</h3>
            <AllCategoriesLinkBtn to="/catalog" className="section2-btn">All categories</AllCategoriesLinkBtn>
          </div>
          <div className='categories-section2'>
            {categories.slice(0,4).map((elem) => (
              <div key={elem.id} id={elem.id}>
                <img
                  src={`http://localhost:3333/${elem.image}`}
                  alt="categories"
                  className='categories-imgs'
                  onClick={()=> goToOneCatalog(elem.id)}/>
                <h3>{elem.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section2;
