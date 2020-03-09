import React from 'react'
import PropTypes from 'prop-types'

import {Form, Button, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const LoginForm = ({
  handleSubmit,
  username,
  password,
}) => {
  
  return (
    <Grid textAlign='center' style={{height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{maxWidth: 450}}>
        <Header as='h2' color='green' textAlign='center'>
          Log-in to your GooeyHelper Account
        </Header>
          <Form size='large' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input 
                fluid icon='user' 
                iconPosition='left' 
                placeholder='username'
                {...username} 
              />
              <Form.Input 
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='password'
                {...password} 
              />
              <Button color='green' fluid size='large' type="submit">
                login
              </Button>
            </Segment>
          </Form>
          <Message>
            Need an account? Message GooeyGrant on <a href='#'>Discord</a> to get started.
          </Message>
        </Grid.Column>
    </Grid>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm