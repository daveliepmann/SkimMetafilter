(function () {
  // Given the div element of a comment, return its favorite count
  var favoriteForComment = function(commentDiv) {
    var favSpan = $(commentDiv).find('span').filter(function () {
      return this.id.match(/favcnt/);
    });

    var fav = favSpan.text().match(/(\d+) favorites/);
    if (fav === null) {
      return 0;
    } else {
      return parseInt(fav[1], 10);
    }
  };

  var filterComments = function () {
    var totalFavorites = 0;
    var favorites = [];
    var comments = [];

    $('.comments').each(function (index, elem) {
      var fav = favoriteForComment(elem);

      comments.push({'div': elem, 'favorite': fav});
      favorites.push(fav);
      totalFavorites += fav;
    });

    var filterThreshold = totalFavorites * 0.9;

    comments.sort(function (a, b) {
      if (a.favorite > b.favorite) {
        return -1;
      } else if (a.favorite < b.favorite) {
        return 1;
      } else {
        return 0;
      }
    });

    var favoriteSum = 0;
    var deletedCount = 0;

    // Step through the comments until we accumulate enough to satisfy
    // the criterion, and delete all the rest

    $.each(comments, function (index, comment) {
      if (favoriteSum > filterThreshold) {
        var div = $(comment.div);
        div.next('br').remove();
        div.next('br').remove();
        div.remove();

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