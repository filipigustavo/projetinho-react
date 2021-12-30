import { Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";

import ProductsList from './components/ProductsList'
import { FormCategoryWithModal } from "./components/FormCategory";
import { FormProductWithModal } from "./components/FormProduct";
import Axios, { fetcher } from './helpers/axios'
import useTreatedProducts from "./hooks/useTreatedProducts";

function App() {
  const { data: categories, mutate: loadCategories } = useSWR("/categories", fetcher, { fallbackData: [] })
  const { data: products, mutate: loadProducts } = useSWR("/products", fetcher, { fallbackData: [] })
  const productsTreated = useTreatedProducts(products, categories)

  const save = (endpoint, loader) => (setShowLoader, form, reset) => {
    setShowLoader(true)
    Axios
      .post(endpoint, form)
      .then(() => {
        loader()
        reset()
      })
      .catch(err => console.error(err))
      .finally(() => setShowLoader(false))
  }

  const saveProduct = save("/products", loadProducts)
  const saveCategory = save("/categories", loadCategories)

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Nosso sistema em React</h1>

            <FormCategoryWithModal
              label="Criar Categoria"
              initialData={{name: ""}}
              action={saveCategory}
            />
            <FormProductWithModal
              label="Criar Produto"
              initialData={{name: "", category: "", description: "" }}
              action={saveProduct}
              {...{ categories }}
            />
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
