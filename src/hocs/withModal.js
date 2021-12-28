import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

const withModal = (Component) => ({ label, ...rest }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => setOpenModal(true)

  const handleCloseModal = () => setOpenModal(false)

  return <>
    <Button variant="primary" onClick={handleOpenModal}>{label}</Button>

    <Modal show={openModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{label}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Component {...rest} />
      </Modal.Body>
    </Modal>
  </>
}

export default withModal