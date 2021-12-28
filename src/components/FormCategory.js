import { useState } from "react"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Form } from "react-bootstrap"

import Axios from "../helpers/axios"
import withModal from "../hocs/withModal"

const FormCategory = ({ loadCategories }) => {
  const [showLoaderCategory, setShowLoaderCategory] = useState(false)
  const [formCategory, setFormCategory] = useState({ name: "" })

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

  const handleSubmitFormCategory = (event) => {
    event.preventDefault()
    saveCategory()
  }

  const handleChangeFormCategory = (event) => {
    const newForm = Object.assign({}, formCategory)
    newForm[event.target.name] = event.target.value
    setFormCategory(newForm)
  }

  return <Form onSubmit={handleSubmitFormCategory}>
    <Form.Group>
      <Form.Label>Nome</Form.Label>
      <Form.Control name="name" value={formCategory.name} onChange={handleChangeFormCategory} />
    </Form.Group>

    <Button variant="primary" type="submit" className="mt-2">
      Salvar {showLoaderCategory && <FontAwesomeIcon icon={faSpinner} spin />}
    </Button>
  </Form>
}

export default FormCategory

const FormCategoryWithModal = withModal(FormCategory)

export { FormCategoryWithModal }