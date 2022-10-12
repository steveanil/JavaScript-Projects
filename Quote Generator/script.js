const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Global Variable
let apiQuotes = [];

function showLoadingSpinner() {
    // hidden attribute is on any html element. We dont want our loader to be hidden
    loader.hidden = false;
    // quoteContainer will be hidden. This means when the loader is going we will only see the loader and nothing else
    quoteContainer.hidden = true;
}


function removeLoadingSpinner() {
    if (!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show New Quote - generates random quotes
function newQuote() {
    showLoadingSpinner();
    // Pick a random Quote from apiQuotes array. Math.random returns a decimal number >= to 0 and < 1
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // populate the text content of author and quote element
    // Check if Author field is blank and replace it with quote 'Unknown'
    if (!quote.author){
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    // Check Quote length to determine styling
    if (quote.text.length > 100){
        // this is going add a css class using classList
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    removeLoadingSpinner();
}

// Get Quotes from API
/* 
* To get quotes from API, use an async fetch request within a try catch statement.
* An asynchronous function can run at anytime independently and it won't stop the browser from completing the loading of a page.
* try catch statement allows us to attempt to complete a fetch request but if it doesn't work, it can catch the error info
*/

async function getQuotes() {
    showLoadingSpinner();
    // we need apiUrl
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        // Our fetch request, this const will not be populated until it has some data fetched from the API
        const response = await fetch(apiUrl);
        /* 
        * Global Variable, here it turns the response received into a JSON object and pass it onto the globalVariable called apiQuotes. 
        * Since from a webserver it is just a series of strings so we have to conver it to a JSON object 
        */
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    
    }
}

//  Tweet Quote
function tweetQuote() {
    // '?' means we are going to have a query parameter. We can use variables within a template string.
    const twitterUrl = `https://twitter.com/intent/tweet?text= ${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners - to add functionality to our buttons
//*: targetting a click event 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// On Load, we need to run getQuotes function
getQuotes();
