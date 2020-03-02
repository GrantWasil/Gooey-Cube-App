import React from 'react'


const QuoteForm = ({ 
  handleSubmit,
  quote,
  type, 
  chapter
}) => {
  return (
    <div>
      <h2>Create a new Rumor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          new rumor
          <input {...quote}/>
        </div>
        <div>
          <select {...type}>
            <option value="hanataz" selected>Hanataz</option>
            <option value="towny">Towny</option>
          </select>
        </div>
        <div>
          chapter
          <select {...chapter}>
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4" disabled>4</option>
            <option value="5" disabled>5</option>
            <option value="6" disabled>6</option>
            <option value="7" disabled>7</option>
          </select>
        </div>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default QuoteForm