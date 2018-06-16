'use strict';

const axios = require('axios');

/*eslint max-len: ["error", { "ignoreUrls": true }]*/
const url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1';

module.exports.quoteHandler = async function(req, res) {
  let response = await getQuote();
  let quote = response.data[0].content;

  res.write(`<h1 id="quote">${quote}</h1>`);
  res.write(`
    <script>
      setInterval(function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:3000/get-new-quote", true);
        xhr.send();

        xhr.addEventListener("readystatechange", processRequest, false);

        xhr.onreadystatechange = processRequest;
        function processRequest(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById('quote').innerHTML = xhr.responseText; 
          }
        }
      }, 5000);
    </script>`
  );
  res.end();
};

module.exports.getNewQuoteHandler = async function(req, res) {
  let response = await getQuote();
  res.write(response.data[0].content);
  res.end();
};

async function getQuote() {
  let quote = '';

  try {
    quote = await axios.get(url);
  } catch (error) {
    console.log(error);
  }

  return quote;
}
