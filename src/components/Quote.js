import React from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Card from 'react-bootstrap/Card'

const Quote = ({quote, toggleUsed, handleDelete, showDeleteWarning, setShowDeleteWarning}) => {
  const label = quote.used 
  ? 'used' : 'not used'
  const background = quote.used
  ? 'secondary' : 'primary'

  const handleClose = () => setShowDeleteWarning(false);
  const handleOpen = () => setShowDeleteWarning(true);

  return (
    <div className="card-edges">
      <Modal show={showDeleteWarning} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Warning</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you would like to delete this item?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
      </Modal>
      <Card style={{ width: '20rem', height: '28rem'}}>
        <Card.Body>
          <Card.Text>
            {quote.quote} {quote.type}
          </Card.Text>
          <Button variant={background} onClick={toggleUsed}>{label}</Button>
          <Button variant='danger' onClick={handleOpen}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Quote