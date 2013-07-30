(function () {
  var debug = false;

  // Given the div element of a comment, return its timestamp
  var timestampForComment = function(commentDiv) {
    var regex  = /(\d+):(\d+).*(January|February|March|April|May|June|July|August|September|October|November|December) (\d+)/;
    var text = $($(commentDiv).find('.smallcopy')).text();
    var pieces = text.match(regex);

    if (pieces === null) {
      // This is the div for the comment box at the end of the page.
      return 0;
    } else {
      return (Date.parse(pieces[0].replace(/on/, '')));
    }
  }

  var loggedIn;

  // Return true if this is a logged-in use
  var isLoggedIn = function() {
    if (loggedIn === undefined) {
      var login = $('#navoften').find('li').filter(function() {
        return $(this).find('a').html().match(/Login/);
      });

      loggedIn = (login.length === 0);
    }

    return loggedIn;
  };

  notLoggedInFavorite = function(commentDiv) {
    var favAnchor = $(commentDiv).find('span').find('a').filter(function() {
      return $(this).html().match(/favorite/);
    });

    var fav = favAnchor.text().match(/(\d+) favorite/);
    if (fav === null) {
      return 0;
    } else {
      return parseInt(fav[1], 10);
    }
  };

  loggedInFavorite = function(commentDiv) {
    var favSpan = $(commentDiv).find('span').filter(function () {
      return this.id.match(/favcnt/);
    });

    var fav = favSpan.text().match(/(\d+) favorite/);
    if (fav === null) {
      return 0;
    } else {
      return parseInt(fav[1], 10);
    }
  };

  // Given the div element of a comment, return its favorite count
  favoriteForComment = function(commentDiv) {
    if (isLoggedIn()) {
      return loggedInFavorite(commentDiv);
    } else {
      return notLoggedInFavorite(commentDiv);
    }
  };

  filterComments = function () {
    var totalFavorites = 0;
    var favorites      = [];
    var comments       = [];

    $('.comments').each(function (index, elem) {
      var fav       = favoriteForComment(elem);
      var timestamp = timestampForComment(elem);

      comments.push({'div': elem, 'favorite': fav, 'timestamp': timestamp});
      favorites.push(fav);
      totalFavorites += fav;
    });

    var filterThreshold = totalFavorites * 0.95;

    // Sorts a, b in decreasing order
    var intCompare = function(a, b) {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    };

    comments.sort(function (a, b) {
      var favResult = intCompare(a.favorite, b.favorite);
      if (favResult === 0) {
        // Prefer older comments to newer ones
        return (intCompare(b.timestamp, a.timestamp));
      } else {
        return favResult;
      }
    });

    var favoriteSum  = 0;
    var deletedCount = 0;

    // Step through the comments until we accumulate enough to satisfy
    // the criterion, and delete all the rest

    $.each(comments, function (index, comment) {
      if (favoriteSum > filterThreshold) {
        var div = $(comment.div);

        if (debug) {
          div.css({'background-color': 'rgb(0,51,70)'});
        } else {
          div.next('br').remove();
          div.next('br').remove();
          div.remove();
        }

        deletedCount += 1;
      } else {
        favoriteSum += comment.favorite;
      }
    });

    // Provide a visual indication that the page has been filtered
    $('body').css({'background-color': 'rgb(0,102,140)'});

    console.log("Total favorites = " + totalFavorites + "; threshold = " + filterThreshold +
                "; kept " + (comments.length - deletedCount) + " out of " + comments.length +
                " comments");
  };

  filterComments();
})();
