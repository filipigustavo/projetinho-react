import { Form } from "react-bootstrap"

import withModal from '../hocs/withModal'
import withForm from "../hocs/withForm"
import compose from "../helpers/compose"

const ProductFields = ({ categories, form, onChangeForm }) => {
  return <>
    <Form.Group>
      <Form.Label>Categoria</Form.Label>
      <Form.Select name="category" value={form.category} onChange={onChangeForm}>
        <option>Selectione uma categoria</option>
        {categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
      </Form.Select>
    </Form.Group>

    <Form.Group>
      <Form.Label>Nome</Form.Label>
      <Form.Control name="name" value={form.name} onChange={onChangeForm} />
    </Form.Group>

    <Form.Group>
      <Form.Label>Descrição</Form.Label>
      <Form.Control as="textarea" name="description" value={form.description} onChange={onChangeForm}></Form.Control>
    </Form.Group>
  </>
}

export default ProductFields

const FormProductWithModal = compose(withModal, withForm)(ProductFields)

export { FormProductWithModal }