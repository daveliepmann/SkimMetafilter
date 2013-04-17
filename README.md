SkimMetafilter
==============

I love reading the comments on [Metafilter](http://www.metafilter.com). Sometimes, though, a thread is too long and I don't have the time to read through all of the comments. This is a bookmarklet I use to show me only the "best" comments.

To use, create a bookmark with the following text as the link, and click it when you're on a Metafilter discussion page.

```javascript
javascript:(function() { var newScript = document.createElement('script'); newScript.src = 'https://raw.github.com/vikasgorur/SkimMetafilter/master/SkimMetafilter.js'; document.body.appendChild(newScript); })()
```
