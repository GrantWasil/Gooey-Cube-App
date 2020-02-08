import React, { useState, useEffect } from 'react'

// Components
import QuoteList from './components/QuoteList'
import QuoteForm from './components/QuoteForm'
import QuoteButtons from './components/QuoteButtons'
import Navigation from './components/Navigation'

// Services
import quoteService from './services/quotes'

// Style Components
import CardDeck from 'react-bootstrap/CardDeck'

const App = () => {
  const [quotes, setQuotes] = useState([])
  const [newQuote, setNewQuote] = useState('')
  const [quoteType, setQuoteType] = useState('hanataz')
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [showQuotes, setShowQuotes] = useState('all');

  useEffect(() => {
    console.log('effect')
    quoteService
      .getAll()
      .then(initialQuotes => {
        setQuotes(initialQuotes)
      })
  }, [])

  const toggleUsedOf = id => {
    const quote = quotes.find(q => q.id === id)
    const changedQuote = {...quote, used: !quote.used}

    quoteService
      .update(id, changedQuote)
      .then(returnedQuote => { 
        setQuotes(quotes.map(quote => quote.id !== id? quote : returnedQuote))
      })
      .catch(error => {
        alert (
          `the quote '${quote.quote} was already deleted from the server`
        )
        setQuotes(quotes.filter(q => q.id !== id))
      })
  }

  const handleDeleteOf = id => {
    quoteService
    .remove(id)
    .then(setQuotes(quotes.filter(quote => quote.id !== id)))
    .then(setShowDeleteWarning(false))
}
  

  return (
    <div>
      <Navigation />
      <br></br>
      <div className="quotes">
        <h3>Add a new Quote</h3>
        <QuoteForm 
          quotes={quotes}
          setQuotes={setQuotes}
          newQuote={newQuote} 
          setNewQuote={setNewQuote} 
          quoteType={quoteType} 
          setQuoteType={setQuoteType}
          />
      </div>
      <QuoteButtons 
        setShowQuotes={setShowQuotes}
        />
      <CardDeck>
        <QuoteList 
          showQuotes={showQuotes} 
          quotes={quotes} 
          handleDeleteOf={handleDeleteOf} 
          toggleUsedOf={toggleUsedOf}
          showDeleteWarning={showDeleteWarning}
          setShowDeleteWarning={setShowDeleteWarning}
          />
      </CardDeck>
    </div>
  )
}

export default App