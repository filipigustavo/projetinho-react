import { Button, Table } from "react-bootstrap"

import { FormProductWithModal } from "./ProductFields"
import rawProduct from "../helpers/findRawProduct"

const ProductsList = ({ products, categories, onEdit, onDelete }) => {
  return <Table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nome</th>
        <th>Categoria</th>
        <th>Descrição</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      {!products.length && <tr>
        <th colSpan="4">Lista vazia =(</th>
      </tr>}

      {products.map((item) => <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.category.name}</td>
        <td>{item.description}</td>
        <td>
          <FormProductWithModal
            label="Editar"
            initialData={rawProduct(item)}
            action={onEdit(item.id)}
            {...{categories}}
          />
          <Button variant="danger" onClick={onDelete(item.id)}>Apagar</Button>
        </td>
      </tr>)}
    </tbody>
  </Table>
}

export default ProductsList