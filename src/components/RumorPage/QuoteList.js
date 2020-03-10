import React from 'react'
import Quote from './Quote'
import { Card, Grid, Segment } from 'semantic-ui-react'

const QuoteList = ({ showQuotes, toggleUsedOf, quotes, handleDeleteOf, showDeleteWarning, setShowDeleteWarning, randomQuote, setRandomQuote }) => {
  let quotesToShow= []
  let quoteToShow;



  if (showQuotes === 'hanataz' || showQuotes === 'towny') {
    quotesToShow = quotes.filter(quote => ((quote.type === showQuotes) && (quote.used !== true)))
    setRandomQuote(Math.floor(Math.random() * quotesToShow.length))
    quotesToShow =  quotesToShow[randomQuote]
    quoteToShow = quotesToShow
  } else {
    quotesToShow = quotes
  } 

  console.log(quotes)
  console.log(quotesToShow)
  console.log(quoteToShow)


  return (
    <Segment>
      <Card.Group textAlign='center'>
        {quotesToShow.length > 1 
        ? quotesToShow.map(quote =>
          <Quote
            key={quote.id}
            quote={quote}
            toggleUsed={() => toggleUsedOf(quote.id)}
            handleDelete={() => handleDeleteOf(quote.id)}
            showDeleteWarning={showDeleteWarning}
            setShowDeleteWarning={setShowDeleteWarning}
          />
          )
        : quoteToShow != null 
        ? <Quote 
            key={quoteToShow.id}
            quote={quoteToShow}
            toggleUsed={() => toggleUsedOf(quoteToShow.id)}
            handleDelete={() => handleDeleteOf(quoteToShow.id)}
            showDeleteWarning={showDeleteWarning}
            setShowDeleteWarning={setShowDeleteWarning}
          />
            : <div>Loading...</div>
        }
        
    </Card.Group>
  </Segment>
  )
}

export default QuoteList