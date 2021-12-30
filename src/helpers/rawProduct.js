const rawProduct = (product) => {
  const raw = Object.assign({}, product)
  raw.category = raw.category.id
  return raw
}

export default rawProduct