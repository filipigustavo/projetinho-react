import { useState } from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Form } from "react-bootstrap"

import Axios from "../helpers/axios"
import withModal from '../hocs/withModal'

const FormProduct = ({ categories, loadProducts }) => {
  const [showLoaderProduct, setShowLoaderProduct] = useState(false)
  const [formProduct, setFormProduct] = useState({ name: "", category: "", description: "" })

  const handleChangeFormProduct = (event) => {
    const newForm = Object.assign({}, formProduct)
    newForm[event.target.name] = event.target.value
    setFormProduct(newForm)
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

  const handleSubmitFormProduct = (event) => {
    event.preventDefault()
    saveProduct()
  }

  return <Form onSubmit={handleSubmitFormProduct}>
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
}

export default FormProduct

const FormProductWithModal = withModal(FormProduct)

export { FormProductWithModal }