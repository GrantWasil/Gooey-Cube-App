import React from 'react'
import Button from 'react-bootstrap/Button'

const QuoteButtons = ({ setShowQuotes }) => {

  return (
    <div className="quote-buttons">
      <Button onClick={() => {setShowQuotes('hanataz')}}>Show Hanataz Quotes</Button>
      <Button onClick={() => {setShowQuotes('towny')}}>Show Towny Quotes</Button>
      <Button onClick={() => {setShowQuotes('all')}} variant='success'>Show All Quotes</Button>
    </div>
  )
}

export default QuoteButtons