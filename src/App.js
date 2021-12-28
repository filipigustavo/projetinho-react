import { useEffect, useState } from "react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";
import axios from "axios";

// import './App.css';
const baseURL = "https://61c9b5bb20ac1c0017ed8db4.mockapi.io/api/"
const Axios = axios.create({baseURL})

function App() {
  const [openModalCategory, setOpenModalCategory] = useState(false)
  const [openModalProduct, setOpenModalProduct] = useState(false)
  const [showLoaderCategory, setShowLoaderCategory] = useState(false)
  const [showLoaderProduct, setShowLoaderProduct] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [formCategory, setFormCategory] = useState({ name: "" })
  const [formProduct, setFormProduct] = useState({ name: "", category: "", description: "" })

  const handleOpenModalCategory = () => setOpenModalCategory(true)

  const handleOpenModalProduct = () => setOpenModalProduct(true)

  const handleCloseModalCategory = () => setOpenModalCategory(false)

  const handleCloseModalProduct = () => setOpenModalProduct(false)

  const handleChangeFormCategory = (event) => {
    const newForm = Object.assign({}, formCategory)
    newForm[event.target.name] = event.target.value
    setFormCategory(newForm)
  }

  const handleChangeFormProduct = (event) => {
    const newForm = Object.assign({}, formProduct)
    newForm[event.target.name] = event.target.value
    setFormProduct(newForm)
  }

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

  const saveCategory = () => {
    setShowLoaderCategory(true)
    Axios
      .post("/categories", formCategory)
      .then(() => {
        loadCategories()
        setFormCategory({ name: "" })
      })
      .catch(err => console.error(err))
      .finally(() => setShowLoaderCategory(false))
  }

  const saveProduct = () => {
    setShowLoaderProduct(true)
    Axios
      .post("/products", formProduct)
      .then(() => {
        loadProducts()
        setFormProduct({ name: "", category: "", description: "" })
      })
      .catch(err => console.error(err))
      .finally(() => setShowLoaderProduct(false))
  }

  const handleSubmitFormCategory = (event) => {
    event.preventDefault()
    saveCategory()
  }

  const handleSubmitFormProduct = (event) => {
    event.preventDefault()
    saveProduct()
  }

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Nosso sistema em React</h1>

            <Button variant="primary" onClick={handleOpenModalCategory}>Criar Categoria</Button>
            <Button variant="primary" onClick={handleOpenModalProduct}>Criar Produto</Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {!products.length && <tr>
                  <th colSpan="4">Lista vazia =(</th>
                </tr>}

                {products.map((item) => <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                </tr>)}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={openModalCategory} onHide={handleCloseModalCategory}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Categoria</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmitFormCategory}>
            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control name="name" value={formCategory.name} onChange={handleChangeFormCategory} />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              Salvar {showLoaderCategory && <FontAwesomeIcon icon={faSpinner} spin />}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={openModalProduct} onHide={handleCloseModalProduct}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Produto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmitFormProduct}>
            <Form.Group>
              <Form.Label>Categoria</Form.Label>
              <Form.Select name="category" value={formProduct.category} onChange={handleChangeFormProduct}>
                <option>Selectione uma categoria</option>
                {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nome</Form.Label>
              <Form.Control name="name" value={formProduct.name} onChange={handleChangeFormProduct} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control as="textarea" name="description" value={formProduct.description} onChange={handleChangeFormProduct}></Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
              Salvar {showLoaderProduct && <FontAwesomeIcon icon={faSpinner} spin />}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default App;
