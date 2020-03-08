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
            <option value="" disabled>Select an Option</option>
            <option value="hanataz">Hanataz</option>
            <option value="towny">Towny</option>
          </select>
        </div>
        <div>
          chapter
          <select {...chapter}>
            <option value="" disabled>Select an Option</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4" disabled>4</option>
            <option value="5" disabled>5</option>
            <option value="6" disabled>6</option>
            <option value="7" disabled>7</option>
          </select>
        </div>
        { type.value !== '' && chapter.value !== '' 
        ? <button type="submit">save</button> :
        <div></div> }
      </form>
    </div>
  )
}

export default QuoteForm