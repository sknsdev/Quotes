const pageTextContainer = document.getElementById('quote-container');
const pageQuoteText = document.getElementById('quote-text');
const pageQuoteAuthor = document.getElementById('quote-author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

function randomQuote () {
    const readyQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    return readyQuote
}
//Показ лоадера
function loading(){
    loader.hidden = false;
    pageTextContainer.hidden = true;
}

//Спрятать лоадер
function completeLoading (){
    if (loader.hidden == false){
        pageTextContainer.hidden = false;
        loader.hidden = true;
    }
}

//Получение цитаты при помощи апи

async function getQuote() {
    loading();
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; //для обхода api
    const apiURL = 'https://type.fit/api/quotes'
    try {
        
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        singleQuote = randomQuote();
        pageQuoteText.innerText = singleQuote.text;
        pageQuoteAuthor.innerText = singleQuote.author;
        completeLoading();
        //console.log(singleQuote.text);
    } catch (error) {
        console.log(error);
    }
}

function tweetQuote (){ //tweeter posting
    const tweetText = pageQuoteText.innerText;
    const author = pageQuoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Events
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load page
getQuote();



