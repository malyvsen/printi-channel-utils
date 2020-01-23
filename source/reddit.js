const RSSParser = require('rss-parser');

async function fetchFeed(suburl = '') {
  let proxy = 'https://cors-anywhere.herokuapp.com/';
  let url = proxy + 'https://www.reddit.com' + suburl + '/.rss';
  return await parseRSS(url);
}

function getImage(post) {
  let parser = new DOMParser();
  let content = parser.parseFromString(post.content, 'text/html');
  let links = Array.from(content.links).map(a => a.href);
  let imageLinks = links.filter(link => link.startsWith('https://i.redd.it'));
  if (imageLinks.length == 0) return null;
  return imageLinks[0];
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

module.exports = {fetchFeed: fetchFeed, getImage: getImage};
