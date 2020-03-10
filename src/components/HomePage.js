import React from 'react'

import { Container, Header, Icon, Grid, Segment, GridColumn, Button, Divider} from 'semantic-ui-react'

const HomePage = () => {

    return (
        <div>
            <Container text>
                <Header 
                    as='h2'
                    icon
                    textAlign='center'
                    style={{
                        paddingTop: '3em'
                    }}
                >
                    <Icon name='lock open' circular/>
                    <Header.Content>GooeyHelper Beta</Header.Content>
                </Header>
            </Container>
            <Segment style={{padding: '8em 0em'}} vertical>
                <Grid container stackable verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as='h3' style={{fontSize: '2em'}}>
                                A GM's Best Friend
                            </Header>
                            <p style={{ fontSize: '1.33em'}}>
                                Access all of your favorite GooeyCube content from one, easy-to-use location! 
                                Be ready for anything your players throw at you, it's all just a few clicks away!
                            </p>
                            <Header as='h3' style={{fontSize: '2em'}}>
                                Be a world-class DM
                            </Header>
                            <p style={{ fontSize: '1.33em', fontStyle: 'italic'}}>
                               With one click, you are able to show handouts to your players, wherever they are!
                               For the best experience, ensure that all of your players have access to your link!
                            </p>
                        </Grid.Column>
                        <GridColumn floated='right' width={6}>
                            <Icon color='green' size='massive' name='lightbulb'/>
                        </GridColumn>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column textAlign='center'>
                            <Button size='huge'>Get Started</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '0em'}} vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em'}}>
                                "This is exactly what I needed"
                            </Header>
                            <p style={{fontSize: '1.33em' }}>-DM Grant</p>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em'}}>
                                "I can't believe that I've been playing without this"
                            </Header>
                            <p style={{fontSize: '1.33em' }}>-Probably Some other DM</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>

            <Segment style={{ padding: '8em 0em' }} vertical>
                <Container text>
                    <Header as='h3' style={{ fontSize: '2em' }}>
                        Created for the best 5E suppliment avaialable
                    </Header>
                    <p style={{ fontSize: '1.33em' }}>
                        Lorem Ipsum Buy All of GooeyCube's Stuff.
                        Lorem Ipsum Buy All of GooeyCube's Stuff.
                        Lorem Ipsum Buy All of GooeyCube's Stuff.
                        Lorem Ipsum Buy All of GooeyCube's Stuff.
                        Lorem Ipsum Buy All of GooeyCube's Stuff.
                        Lorem Ipsum Buy All of GooeyCube's Stuff.
                        Lorem Ipsum Buy All of GooeyCube's Stuff.
                    </p>
                    <Button as='a' size='large'>
                        Read More
                    </Button>
                </Container>
            </Segment>
        </div>
        

    )
}

export default HomePage