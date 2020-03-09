import React from 'react'
import {Button, Card} from 'semantic-ui-react'


const Quote = ({ quote, toggleUsed, handleDelete, showDeleteWarning, setShowDeleteWarning }) => {
  const label = quote.used
    ? 'used' : 'not used'
  const background = quote.used
    ? 'grey' : 'green'

  return (
    <div className="card-edges">
      <Card style={{margin: 5, minHeight: 350}}>
        <Card.Content>
          <Card.Meta>
            {quote.type} ch. {quote.chapter}
          </Card.Meta>
          <Card.Description>
            {quote.quote}  
          </Card.Description>    
          </Card.Content>
          <Card.Content extra>
            <Button color={background} onClick={toggleUsed}>{label}</Button>
            <Button negative onClick={handleDelete}>Delete</Button>
          </Card.Content>
      </Card>
    </div>
  )
}

export default Quote