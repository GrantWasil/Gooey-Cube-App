import React, { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

// Components
import Quote from './components/Quote'
import QuoteList from './components/QuoteList'
import QuoteForm from './components/QuoteForm'
import QuoteButtons from './components/QuoteButtons'
import Toggleable from './components/Togglable'
import LoginForm from './components/LoginForm'

// Services
import loginService from './services/login'

// Style Components
import {CardDeck, Alert, Nav, Navbar} from 'react-bootstrap'
import { Container } from 'semantic-ui-react'

// Hooks
import {useField, useResource} from './hooks' 


const App = () => {
  const [quotes, setQuotes] = useState([])
  const [newQuote, setNewQuote] = useState('')
  const [quoteType, setQuoteType] = useState('hanataz')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [showQuotes, setShowQuotes] = useState('all')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  // Login Hooks
  const username = useField('text')
  const password = useField('password')

  // Quote Hooks
  const quotesRoute = useResource('quotes')
  const quote = useField('text')
  const type = useField()
  const chapter = useField()


  useEffect(() => {
    quotesRoute
      .getAll()
      .then(initialQuotes => {
        setQuotes(initialQuotes)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      quotesRoute.setToken(user.token)
    }
  }, [])

  const handleDeleteOf = id => {
    quotesRoute
      .remove(id)
      .then(setQuotes(quotes.filter(quote => quote.id !== id)))
      .then(setShowDeleteWarning(false))
  }

  const handleLogin = async (event) => {
    const loginUsername = username.value; 
    const loginPassword = password.value; 
    event.preventDefault()
    try {
      const user = await loginService.login({loginUsername, loginPassword})

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      quotesRoute.setToken(user.token)
      setUser(user)
      setMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      username.reset()
      password.reset()
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addQuote = (event) => {
    event.preventDefault()
    quoteFormRef.current.toggleVisibility()
    const quoteObject = {
      quote: quote.value,
      type: type.value,
      chapter: chapter.value,
      used: false,
      id: quotes.length + 1,
    }
    quote.reset()
    type.reset()
    chapter.reset()
    quotesRoute
      .create(quoteObject)
      .then(returnedQuote => {
        setQuotes(quotes.concat(returnedQuote))
        setNewQuote('')
      })
  }

  const toggleUsedOf = id => {
    const quote = quotes.find(q => q.id === id)
    const changedQuote = { ...quote, used: !quote.used }

    quotesRoute
      .update(id, changedQuote)
      .then(returnedQuote => {
        setQuotes(quotes.map(quote => quote.id !== id ? quote : returnedQuote))
      })
      .catch(error => {
        alert(
          `the quote '${quote.quote} was already deleted from the server`
        )
        setQuotes(quotes.filter(q => q.id !== id))
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <h1>GooeyHelper</h1>
          <button onClick={() => setLoginVisible(true)}>Get Started</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const quoteFormRef = React.createRef()

  return (
    <Container>
      {errorMessage != null ?
        <Alert variant="warning">{errorMessage}</Alert> :
      <div></div> }
      {message != null ?
        <Alert variant="success">{message}</Alert> :
      <div></div> }
      <br></br>
      <div>
        {user === null ?
          loginForm() : 
            <div>
            <Router>
              <Navbar collapseOnSelect expand="lg">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="mr-auto">
                    <Nav.Link href="#" as="span">
                      <Link to="/">Home</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <Link to="/rumors">Rumors</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <Link to="/events">Events</Link>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <p>{user.name} logged in</p>
                    </Nav.Link>
                    <Nav.Link href="#" as="span">
                      <button onClick={() => handleLogout()}>Log Out</button>
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <Route exact path="/rumors">
                <div className="quotes">
                  <Toggleable buttonLabel="new rumor" ref={quoteFormRef}>
                    <QuoteForm
                      handleSubmit={addQuote}
                      quote={quote}
                      type={type}
                      chapter={chapter}
                    />
                  </Toggleable>
                </div>
                <QuoteButtons
                  setShowQuotes={setShowQuotes}
                />
                <CardDeck>
                  <QuoteList
                    showQuotes={showQuotes}
                    quotes={quotes}
                    handleDeleteOf={handleDeleteOf}
                    toggleUsedOf={toggleUsedOf}
                    showDeleteWarning={showDeleteWarning}
                    setShowDeleteWarning={setShowDeleteWarning}
                  />
                </CardDeck>
              </Route>
              <Route path="/events">
                  
              </Route>
            </Router>
          </div>
          }
      </div>  
    </Container>
  )
}

export default App