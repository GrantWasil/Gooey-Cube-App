import React, { useState, useEffect } from 'react'
import { 
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

// Components
import GetStarted from './components/GetStarted'
import Navigation from './components/Navigation'
import RumorPage from './components/RumorPage'
import HomePage from './components/HomePage'

// Services
import loginService from './services/login'

// Style Components
import { Container, Divider, Message } from 'semantic-ui-react'

// Hooks
import {useField, useResource} from './hooks' 

// WebSockets
import io from 'socket.io-client'



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
  const [visible, setVisibile] = useState(true)
  const [chapterSelection, setChapterSelection] = useState(1)
  const [randomQuote, setRandomQuote] = useState(0)

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



  const quoteFormRef = React.createRef()

  return (
    <Container>
      {errorMessage != null ?
        <Message size='large' negative>
          <Message.Header>
            {errorMessage}
          </Message.Header>
        </Message> :
      <div></div> }
      <Divider hidden />
      <div>
        {user === null ?
          <GetStarted 
            visible={visible}
            setVisibile={setVisibile}
            username={username}
            password={password}
            handleLogin={handleLogin}
          /> : 
            <div>
            <Router>
              <Divider hidden/>
              <Navigation 
                user={user}
                handleLogout={handleLogout}
              />
              {message != null ?
                <Message positive>
                  <Message.Header>
                    {message}
                  </Message.Header>
                </Message> :
                <div></div>}
              <br></br>
              <Route exact path="/" render={() => 
                <HomePage />
              } />
              <Route exact path="/rumors" render={() => 
                <RumorPage 
                  quoteFormRef={quoteFormRef}
                  addQuote={addQuote}
                  quote={quote}
                  type={type}
                  chapter={chapter}
                  setShowQuotes={setShowQuotes}
                  showQuotes={showQuotes}
                  quotes={quotes}
                  handleDeleteOf={handleDeleteOf}
                  toggleUsedOf={toggleUsedOf}
                  showDeleteWarning={showDeleteWarning}
                  setShowDeleteWarning={setShowDeleteWarning}
                  chapterSelection={chapterSelection}
                  setChapterSelection={setChapterSelection}
                  randomQuote={randomQuote}
                  setRandomQuote={setRandomQuote}
                />} />
    
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