import { Form } from "react-bootstrap"

import withModal from "../hocs/withModal"
import withForm from "../hocs/withForm"
import compose from '../helpers/compose'

const CategoryFields = ({ form, onChangeForm }) => {
  return <>
    <Form.Group>
      <Form.Label>Nome</Form.Label>
      <Form.Control name="name" value={form.name} onChange={onChangeForm} />
    </Form.Group>
  </>
}

export default CategoryFields

const FormCategoryWithModal = compose(withModal, withForm)(CategoryFields)

export { FormCategoryWithModal }