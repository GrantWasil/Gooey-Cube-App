import React from 'react'

// Components 
import QuoteButtons from './RumorPage/QuoteButtons'
import QuoteList from './RumorPage/QuoteList'
import Toggleable from './Togglable'
import QuoteForm from './RumorPage/QuoteForm'

// Styles
import {Divider} from 'semantic-ui-react'

const RumorPage = ({
    quoteFormRef,
    addQuote,
    quote,
    type,
    chapter,
    setShowQuotes,
    showQuotes,
    quotes,
    handleDeleteOf,
    toggleUsedOf,
    showDeleteWarning,
    setShowDeleteWarning,
    chapterSelection,
    setChapterSelection,
    randomQuote,
    setRandomQuote
}) => {
    return (
    <div>
        <QuoteButtons
            setShowQuotes={setShowQuotes}
            showQuotes={showQuotes}
            chapterSelection={chapterSelection}
            setChapterSelection={setChapterSelection}
        />
        <Divider hidden/>
        <Toggleable buttonLabel="new rumor" ref={quoteFormRef}>
            <QuoteForm
            handleSubmit={addQuote}
            quote={quote}
            type={type}
            chapter={chapter}
            />
        </Toggleable>
        <QuoteList
            showQuotes={showQuotes}
            quotes={quotes}
            handleDeleteOf={handleDeleteOf}
            toggleUsedOf={toggleUsedOf}
            showDeleteWarning={showDeleteWarning}
            setShowDeleteWarning={setShowDeleteWarning}
            randomQuote={randomQuote}
            setRandomQuote={setRandomQuote}
        />
    </div>
    )
}

export default RumorPage