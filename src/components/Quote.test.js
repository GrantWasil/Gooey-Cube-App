import React from 'react'
import '@testing-library/jest-dom/extend-expect' 
import {render} from '@testing-library/react'
import Quote from './Quote' 

test('renders content', () => {
    const quote = {
        quote: 'Component testing is done with react-testing-library',
        type: 'hanataz',
        used: false
    }

    const component = render(
        <Quote quote={quote} />
    )

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
})