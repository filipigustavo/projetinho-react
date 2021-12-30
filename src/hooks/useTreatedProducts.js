import { useEffect, useState } from 'react'

const useTreatedProducts = (products, categories) => {
  const [productsTreated, setProductsTreated] = useState([])

  useEffect(() => {
    if (!!products.length && !!categories.length) {
      const getCategoryName = (id) => {
        if (!categories.length) return { name: '' }
        return categories.find((item) => item.id === id)
      }

      let newProducts = JSON.parse(JSON.stringify(products))

      newProducts = newProducts.map((item) => {
        item.category = getCategoryName(item.category)
        return item
      })

      setProductsTreated(newProducts)
    }
  }, [products, categories])

  return productsTreated
}

export default useTreatedProducts