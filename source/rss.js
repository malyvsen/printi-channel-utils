const RSSParser = require('rss-parser');



async function fetchFeed(url) {
  let proxy = 'https://cors-anywhere.herokuapp.com/';
  return await parseRSS(proxy + url);
}

function parseRSS(url) {
  let parser = new RSSParser();
  return new Promise((resolve, reject) => {
    parser.parseURL(url, (err, feed) => {
      if (err) return reject(err);
      resolve(feed);
    })
  });
}



module.exports = {fetchFeed: fetchFeed};
window.rss = module.exports;
