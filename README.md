# SkimMetafilter

I love reading the comments on [Metafilter](http://www.metafilter.com). Sometimes, though, a thread is too long and I don't have the time to read through all of the comments. This is a bookmarklet I use to show me only the "best" comments.

To use, create a bookmark with the following text as the link, and click it when you're on a Metafilter discussion page.

```javascript
javascript:(function() { var newScript = document.createElement('script'); newScript.src = 'https://cdn.rawgit.com/vikasgorur/SkimMetafilter/01df220718286ce19e53d28776ef0bffc611d21b/SkimMetafilter.js'; document.body.appendChild(newScript); })()
```

(Note: We serve the script using [RawGit](https://rawgit.com/) because some browsers won't execute
a direct Github link because it doesn't have the right `Content-Type`).

## How it works

The script goes through a thread and accumulates enough comments to account for 90% of the total number of favorites for that thread. It prefers older comments to newer ones, since in my experience the most insightful comments tend to come fairly early.
