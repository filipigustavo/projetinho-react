import { Table } from "react-bootstrap"

const ProductsList = ({ products }) => {
  
  return <Table>
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
}

export default ProductsList