import React from 'react'
import {Link} from 'react-router-dom'

// Style Component
import {Menu, Container, Button } from 'semantic-ui-react'

const Navigation = ({user, handleLogout}) => {

  return (
    <div>
      <Menu fixed='top'>
        <Container>
          <Menu.Item header>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/rumors">Rumors</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/events">Events</Link>
          </Menu.Item>
          <Menu.Item>
            <p>{user.name} logged in</p>
          </Menu.Item>
          <Menu.Item>
            <Button onClick={() => handleLogout()}>Log Out</Button>
          </Menu.Item>
        </Container>  
      </Menu>
    </div>
  )
}

export default Navigation