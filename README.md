SkimMetafilter
==============

I love reading the comments on [Metafilter](http://www.metafilter.com). Sometimes, though, a thread is too long and I don't have the time to read through all of the comments. This is a bookmarklet I use to show me only the "best" comments.

To use, create a bookmark with the following text as the link, and click it when you're on a Metafilter discussion page.

```javascript
javascript:(function() { var newScript = document.createElement('script'); newScript.src = 'https://cdn.rawgit.com/vikasgorur/SkimMetafilter/master/SkimMetafilter.js'; document.body.appendChild(newScript); })()
```

(Note: We serve the script using [RawGit](https://rawgit.com/) because some browsers won't execute
a direct Github link because it doesn't have the right `Content-Type`).
