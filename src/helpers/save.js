import Axios from "./axios"

const save = (endpoint, loader, method = 'post') => (setShowLoader, form, reset) => {
  setShowLoader(true)
  Axios[method](endpoint, form)
    .then(() => {
      loader()
      reset()
    })
    .catch(err => console.error(err))
    .finally(() => setShowLoader(false))
}

export default save