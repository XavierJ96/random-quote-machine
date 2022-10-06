
import React, {useEffect, useState} from 'react';
import './App.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'




// Get Quotes from json
let quotesDB = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

// color array
var colors = [
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];


function App() {
  
  // state
  const [quote, setQuote] = useState("If the wind will not serve, take to the oars")
  const [author, setAuthor] = useState("Latin Proverb")
  const [quotesArray,setQuotesArray] = useState(null);
  const [, setRandomNumber] = useState(0)
  const [accentColor, setAccentColor] = useState('#282c34')

  // async Function to import Quotes from API
  const fetchQuotes = async(url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quotesDB)
  }, [quotesDB])


  // Function to generate a random number
  // set the random Integer to the length of quote array
  // Determine which quote to show with the position being the randomInteger number
  const getQuote = (() => {
    let randomInteger = Math.floor(quotesArray.length*Math.random())
    let randomColor = Math.floor(colors.length*Math.random())
    setRandomNumber(randomInteger)
    setAccentColor(colors[randomColor])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  })

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        {/* Quote box */}
        <div id="quote-box" style={{color:accentColor}}>
          {/* Quote text */}
          <p id="text">
            "{quote}"
          </p>
          {/* Author of the quote */}
          <p id="author">
            -{author}
          </p>

          <a id="tweet-quote" href= {encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)} style={{backgroundColor:accentColor}}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>

          <button id="new-quote" onClick={() => getQuote()} style={{backgroundColor:accentColor}}><a id="quote-tag">New Quote</a></button>
          
        </div>

      </header>
    </div>
  );
}

export default App;