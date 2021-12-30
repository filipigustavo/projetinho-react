import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"

const withForm = (Component) => ({ action, initialData, ...rest }) => {
  const formData = Object.assign({}, initialData)
  const [form, setForm] = useState(formData)
  const [showLoader, setShowLoader] = useState(false)

  const handleReset = () => setForm(initialData)

  const handleSubmit = (event) => {
    event.preventDefault()
    action(setShowLoader, form, handleReset)
  }

  const handleChangeForm = (event) => {
    const newForm = Object.assign({}, form)
    newForm[event.target.name] = event.target.value
    setForm(newForm)
  }

  return <Form onSubmit={handleSubmit}>
    <Component {...rest} {...{ form }} onChangeForm={handleChangeForm} />
    <Button variant="primary" type="submit" className="mt-2">
      Salvar {showLoader && <FontAwesomeIcon icon={faSpinner} spin />}
    </Button>
  </Form>
}

export default withForm