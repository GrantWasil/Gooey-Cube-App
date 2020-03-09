import React from 'react'
import Quote from './Quote'
import { Card, Grid, Segment } from 'semantic-ui-react'

const QuoteList = ({ showQuotes, toggleUsedOf, quotes, handleDeleteOf, showDeleteWarning, setShowDeleteWarning }) => {
  let quotesToShow= []

  if (showQuotes === 'hanataz' || showQuotes === 'towny') {
    quotesToShow = quotes.filter(quote => ((quote.type === showQuotes) && (quote.used !== true)))
  } else {
    quotesToShow = quotes
  }

  console.log(quotes)
  console.log(quotesToShow)


  return (
    <Segment padded='very'>
      <Card.Group textAlign='center'>
        {quotesToShow.map(quote =>
          <Quote
            key={quote.id}
            quote={quote}
            toggleUsed={() => toggleUsedOf(quote.id)}
            handleDelete={() => handleDeleteOf(quote.id)}
            showDeleteWarning={showDeleteWarning}
            setShowDeleteWarning={setShowDeleteWarning}
          />
          )
        }
    </Card.Group>
  </Segment>
  )
}

export default QuoteList