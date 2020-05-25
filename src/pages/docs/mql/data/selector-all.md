---
title: 'selectorAll'
---

Type: <TypeContainer><Type children='<string>'/> | <Type children='<string[]>'/></TypeContainer><br/>
Values: [CSS selector](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors)

It's the same than [selector](/docs/mql/data/selector) but it returns your a collection of results, being equivalent to [Document.querySelectorAll()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll):

```js{8}
const mql = require('@microlink/mql')

const hackerNews = () =>
  mql('https://news.ycombinator.com/', {
    data: {
      posts: {
        selectorAll: '.athing',
        attr: {
          title: {
            type: 'title',
            selector: '.storylink',
            attr: 'text'
          },
          url: {
            type: 'url',
            selector: '.storylink',
            attr: 'href'
          }
        }
      }
    }
  })

const { data } = await hackerNews()

console.log('latest hacker news posts:', data.posts)
```
