import React from 'react'
import {Button, Menu} from 'semantic-ui-react'

// Components 

const QuoteButtons = ({ 
  setShowQuotes,
  showQuotes,
 }) => {

  return (
      <Menu secondary>
        <Menu.Item>
          <Button
            color='teal'
            active={showQuotes === 'hanataz'}
            onClick={() => {setShowQuotes('hanataz')}}>
              Show Hanataz Quotes
          </Button>
          </Menu.Item>
          <Menu.Item>
            <Button 
              color='teal' 
              active={showQuotes === 'towny'}
              onClick={() => {setShowQuotes('towny')}}>
                Show Towny Quotes
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button 
              positive 
              active={showQuotes === 'all'}
              onClick={() => {setShowQuotes('all')}} 
              variant='success'>
                Show All Quotes
            </Button>
          </Menu.Item>    
        </Menu>
  )
}

export default QuoteButtons