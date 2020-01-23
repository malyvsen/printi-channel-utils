const rss = require('./rss');



async function fetchPosts(subreddit = null, sort = null, period = null) {
  let url = 'https://reddit.com';
  if (subreddit != null) url += '/r/' + subreddit;
  if (sort != null) url += '/' + sort;
  url += '/.rss';
  if (period != null) url += '?t=' + period;

  let feed = await rss.fetchFeed(url);
  return feed.items.map(item => new Post(item));
}

class Post {
  constructor(item) {
    this.title = item.title;
    this.link = item.link;
    this.author = item.author.replace('/u/', '');
    this.date = Date.parse(item.pubDate);

    let parser = new DOMParser();
    let content = parser.parseFromString(item.content, 'text/html');
    let links = Array.from(content.links).map(a => a.href);
    let images = links.filter(link => link.startsWith('https://i.redd.it'));
    this.image = images.length > 0 ? images[0] : null;
    let paragraphs = Array.from(content.getElementsByTagName('p'));
    this.text = paragraphs.map(p => p.innerText).join('\n');
  }
}



module.exports = {fetchPosts: fetchPosts};
window.reddit = module.exports;
