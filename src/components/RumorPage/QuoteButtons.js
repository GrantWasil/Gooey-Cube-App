import React from 'react'
import {Button, Menu, Dropdown} from 'semantic-ui-react'

const chapterOptions = [
  { key: 1, text: 'One', value: 1 },
  { key: 2, text: 'Two', value: 2 },
  { key: 3, text: 'Three', value: 3}
]

const QuoteButtons = ({ 
  setShowQuotes,
  showQuotes,
  chapterSelection,
  setChapterSelection
 }) => {

  const handleChange = (event) => {
    setChapterSelection(event.target.value)
  }

  return (
      <Menu secondary>
        <Menu.Item>
          <Dropdown
            onChange={handleChange}
            options={chapterOptions}
            selection
            value={chapterSelection}
          />
        </Menu.Item>
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