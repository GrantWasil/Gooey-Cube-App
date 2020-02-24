import React, { useState, useEffect } from 'react'

// Components
import QuoteList from './components/QuoteList'
import QuoteForm from './components/QuoteForm'
import QuoteButtons from './components/QuoteButtons'
import Navigation from './components/Navigation'
import Toggleable from './components/Togglable'

// Services
import quoteService from './services/quotes'
import loginService from './services/login'

// Style Components
import CardDeck from 'react-bootstrap/CardDeck'
import LoginForm from './components/LoginForm'

const App = () => {
  const [quotes, setQuotes] = useState([])
  const [newQuote, setNewQuote] = useState('')
  const [quoteType, setQuoteType] = useState('hanataz')
  const [errorMessage, setErrorMessage] = useState(null)
  const [showDeleteWarning, setShowDeleteWarning] = useState(false)
  const [showQuotes, setShowQuotes] = useState('all');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)



  useEffect(() => {
    quoteService
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
      quoteService.setToken(user.token)
    }
  }, [])

  const handleDeleteOf = id => {
    quoteService
      .remove(id)
      .then(setQuotes(quotes.filter(quote => quote.id !== id)))
      .then(setShowDeleteWarning(false))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      quoteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
    event.preventDefault();
    const quoteObject = {
      quote: newQuote,
      type: quoteType,
      used: false,
      id: quotes.length + 1,
    }

    quoteService
      .create(quoteObject)
      .then(returnedQuote => {
        setQuotes(quotes.concat(returnedQuote))
        setNewQuote('')
      })
  }

  const handleQuoteChange = (event) => {
    setNewQuote(event.target.value)
  }

  const handleTypeChange = (event) => {
    setQuoteType(event.target.value)
  }

  const toggleUsedOf = id => {
    const quote = quotes.find(q => q.id === id)
    const changedQuote = { ...quote, used: !quote.used }

    quoteService
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
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <br></br>
      {user === null ?
        loginForm() :
        <div>
          <div className="quotes">
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>Log Out</button>
            <Toggleable buttonLabel="new rumor">
              <QuoteForm
                onSubmit={addQuote}
                handleQuoteChange={handleQuoteChange}
                quoteValue={newQuote}
                handleTypeChange={handleTypeChange}
                quoteType={quoteType}
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