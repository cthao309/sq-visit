import React, { useState } from 'react'
import { postQuote } from '../lib/asyncFunctions'

import Logo from '../img/TLM-Logo.png'
import './QuoteOfDay.css'

const QuoteOfDay = () => {
  const [quote, setQuote] = useState('')
  const [quoteAuthor, setQuoteAuthor] = useState('')

  const handleSubmitQuote = (e) => {
    e.preventDefault()
    const quoteRecord = {
      quote,
      quoteAuthor,
    }

    postQuote(quoteRecord)
      .then((res) => {
        console.log(res)
      })
      .catch(err => err);
  }

  return (
    <div className=" Visitor_Form QuoteOfDay__container">

      <div className="QuoteOfDay__container--header">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="QuoteOfDay__container--text">
        <h1>Quote of the day</h1>
      </div>

      <form className="QuoteOfDay__Form" onSubmit={handleSubmitQuote}>
        <div className="QuoteOfDay__Form--input">
          <input
            className="QuoteOfDay__Form--quote"
            type="text"
            placeholder="Enter Quote"
            name="quoteOfDay"
            value={quote}
            onChange={e => setQuote(e.target.value)}
          />
        </div>
        <div className="QuoteOfDay__Form--input">
          <input
            className="QuoteOfDay__Form--author"
            type="text"
            placeholder="Enter Author of quote"
            name="quoteAuthor"
            value={quoteAuthor}
            onChange={e => setQuoteAuthor(e.target.value)}
          />
        </div>
        <div className="QuoteOfDay__Form--input Visitor_submit">
          <input
            className="QuoteOfDay__Form--submit"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>

  )
}
export default QuoteOfDay
