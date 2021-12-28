import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

import ProductsList from './components/ProductsList'
import Axios from "./helpers/axios";
import { FormCategoryWithModal } from "./components/FormCategory";
import { FormProductWithModal } from "./components/FormProduct";

function App() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [productsTreated, setProductsTreated] = useState([])
  
  const loadCategories = () => {
    Axios
      .get("/categories")
      .then(({data}) => setCategories(data))
  }

  const loadProducts = () => {
    Axios
      .get("/products")
      .then(({data}) => setProducts(data))
  }

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  useEffect(() => {
    if (!!products.length && !!categories.length) {
      const getCategoryName = (id) => {
        if (!categories.length) return { name: '' }
        return categories.find((item) => item.id === id)
      }

      let newProducts = JSON.parse(JSON.stringify(products))

      newProducts = newProducts.map((item) => {
        item.category = getCategoryName(item.category).name
        return item
      })

      setProductsTreated(newProducts)
    }
  }, [products, categories])

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Nosso sistema em React</h1>

            <FormCategoryWithModal label="Criar Categoria" {...{loadCategories}} />
            <FormProductWithModal label="Criar Produto" {...{ categories, loadProducts }} />
          </Col>
        </Row>

        <Row>
          <Col>
            <ProductsList products={productsTreated} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
