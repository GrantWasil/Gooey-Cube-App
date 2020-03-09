import React from 'react'

import {Form, Button, Grid, Header, TextArea} from 'semantic-ui-react'


const QuoteForm = ({ 
  handleSubmit,
  quote,
  type, 
  chapter
}) => {
  return (
    <Grid verticalAlign='middle' textAlign='center'>
      <Grid.Column style={{maxWidth: 450}}>
      <Header as='h2' color='green' textAlign='center'>
        Create a new Rumor
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>rumor text</label>
          <TextArea {...quote}/>
        </Form.Field>
        <Form.Field>
          <label>rumor type</label>
          <select {...type}>
            <option value="" disabled>Select an Option</option>
            <option value="hanataz">Hanataz</option>
            <option value="towny">Towny</option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>chapter</label>
          <select {...chapter}>
            <option value="" disabled>Select an Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4" disabled>4</option>
            <option value="5" disabled>5</option>
            <option value="6" disabled>6</option>
            <option value="7" disabled>7</option>
          </select>
        </Form.Field>
        { type.value !== '' && chapter.value !== '' && quote.value !== ''
        ? <Button type="submit">save</Button> :
        <Button disabled>save</Button> }
      </Form>
      </Grid.Column>
    </Grid>
  )
}

export default QuoteForm