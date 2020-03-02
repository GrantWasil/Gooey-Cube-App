import React, { useState, useEffect } from 'react'

// Components
import QuoteList from './components/QuoteList'
import QuoteForm from './components/QuoteForm'
import QuoteButtons from './components/QuoteButtons'
import Toggleable from './components/Togglable'

// Services
import loginService from './services/login'

// Style Components
import CardDeck from 'react-bootstrap/CardDeck'
import LoginForm from './components/LoginForm'

// Hooks
import {useField, useResource} from './hooks' 


const App = () => {
  const [quotes, setQuotes] = useState([])
  const [newQuote, setNewQuote] = useState('')
  const [quoteType, setQuoteType] = useState('hanataz')
  const [errorMessage, setErrorMessage] = useState(null)
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
    <div>
      {errorMessage != null ?
        <div>{errorMessage}</div> :
      <div></div> }
      <br></br>
      {user === null ?
        loginForm() :
        <div>
          <div className="quotes">
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>Log Out</button>
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
        </div>
      }

    </div>
  )
}

export default App