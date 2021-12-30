import { Col, Container, Row } from "react-bootstrap";
import useSWR from "swr";

import ProductsList from './components/ProductsList'
import { FormCategoryWithModal } from "./components/CategoryFields";
import { FormProductWithModal } from "./components/ProductFields";
import Axios, { fetcher } from './helpers/axios'
import useTreatedProducts from "./hooks/useTreatedProducts";
import save from "./helpers/save";

function App() {
  const { data: categories, mutate: loadCategories } = useSWR("/categories", fetcher, { fallbackData: [] })
  const { data: products, mutate: loadProducts } = useSWR("/products", fetcher, { fallbackData: [] })
  const productsTreated = useTreatedProducts(products, categories)

  const saveProduct = save("/products", loadProducts)
  const saveCategory = save("/categories", loadCategories)

  const handleDeleteProduct = (id) => () => {
    if (!window.confirm("Deseja mesmo fazer isso?")) return

    Axios
      .delete(`/products/${id}`)
      .then(() => loadProducts())
      .catch(err => console.error(err))
  }

  const editProduct = (id) => save(`/products/${id}`, loadProducts, 'put')

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
            <ProductsList
              products={productsTreated}
              {...{categories}}
              onDelete={handleDeleteProduct}
              onEdit={editProduct}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
