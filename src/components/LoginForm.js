import React from 'react'
import PropTypes from 'prop-types'

import {Form, Button} from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  username,
  password,
}) => {
  
  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control {...username} />
          <Form.Label>password:</Form.Label>
          <Form.Control {...password} />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
       </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm