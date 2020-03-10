import React from 'react'

// Styling
import {Grid, Button, Header, Transition, Icon} from 'semantic-ui-react'

// Components 
import LoginForm from './LoginForm'

const GetStarted = ({visible, setVisibile, username, password, handleLogin}) => {
    return (
      <Grid textAlign='center' style={{height: '100vh'}} verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 450}}>
          <Transition.Group animation='browse' duration={1000}>
            <div>
              {visible ?
              <div>
              <Header as='h1' color='green' textAlign='center'>
                GooeyHelper Beta
              </Header>
                <Button icon labelPosition='right' fluid size='large' onClick={() => setVisibile(!visible)}>
                  Get Started
                  <Icon name='right arrow' />
                </Button>
              </div>
              : <div>
                <LoginForm
                    username={username}
                    password={password}
                    handleSubmit={handleLogin}
                  />
              </div>
              }
            </div>
          </Transition.Group>
        </Grid.Column>
      </Grid>
    )
  }

export default GetStarted