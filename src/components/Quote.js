import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Quote = ({ quote, toggleUsed, handleDelete, showDeleteWarning, setShowDeleteWarning }) => {
  const label = quote.used
    ? 'used' : 'not used'
  const background = quote.used
    ? 'secondary' : 'primary'

  return (
    <div className="card-edges">
      <Card style={{ width: '20rem', height: '28rem' }}>
        <Card.Body>
          <Card.Text>
            {quote.quote} 
            <br></br>
            {quote.type}
          </Card.Text>
          <Button variant={background} onClick={toggleUsed}>{label}</Button>
          <Button variant='danger' onClick={handleDelete}>Delete</Button>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Quote