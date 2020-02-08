import React from 'react'

import quoteService from '../services/quotes'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const QuoteForm = ({newQuote, setNewQuote, quoteType, setQuoteType, quotes, setQuotes}) => {

    const handleQuoteChange = (event) => {
        setNewQuote(event.target.value)
    }
    
    const handleQuoteTypeChange = (event) => {
    setQuoteType(event.target.value)
    }

    const addQuote = (event) => {
    event.preventDefault();
    const quoteObject = {
        quote: newQuote,
        type: quoteType,
        used: false
    }

    quoteService
        .create(quoteObject)
        .then(returnedQuote => {
        setQuotes(quotes.concat(returnedQuote))
        setNewQuote('')
        })
    }
    
    return (
        <Form onSubmit={addQuote}>
          <Form.Control as="input" value={newQuote} onChange={handleQuoteChange} />
          <br></br>
          <Form.Control as='select' value={quoteType} onChange={handleQuoteTypeChange}>
            <option value="hanataz">Hanataz</option>
            <option value="towny">Towny</option>
          </Form.Control>
          <Button type="submit">save</Button>
        </Form>
    )
}

export default QuoteForm