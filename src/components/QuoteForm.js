import React from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const QuoteForm = ({ onSubmit, handleQuoteChange, quoteValue, handleTypeChange, typeValue}) => {
    return (
        <div>
            <h2>Create a new Rumor</h2>
            <Form onSubmit={onSubmit}>
            <Form.Control as="input" value={quoteValue} onChange={handleQuoteChange} />
            <br></br>
            <Form.Control as='select' value={handleTypeChange} onChange={typeValue}>
                <option value="hanataz">Hanataz</option>
                <option value="towny">Towny</option>
            </Form.Control>
            <Button type="submit">save</Button>
            </Form>
        </div>
    )
}

export default QuoteForm