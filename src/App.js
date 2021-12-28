import { Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";

import ProductsList from './components/ProductsList'
import { FormCategoryWithModal } from "./components/FormCategory";
import { FormProductWithModal } from "./components/FormProduct";
import { fetcher } from './helpers/axios'
import useTreatedProducts from "./hooks/useTreatedProducts";

function App() {
  const { data: categories, mutate: loadCategories } = useSWR("/categories", fetcher, { fallbackData: [] })
  const { data: products, mutate: loadProducts } = useSWR("/products", fetcher, { fallbackData: [] })
  const productsTreated = useTreatedProducts(products, categories)

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
