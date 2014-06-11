var app = (function() {
  var loading = false;
  var pageNumber = 1;

  var displayPhotos = function(photos) {
    photos.forEach(function(photo) {
      $('<img>').attr('src', photo.url).appendTo('#photos');
    });
  };

  var displayError = function() {
    $('#photos img').remove();
    $('#photos .error').show();
  };

  var loadPhotos = function() {
    if (loading) { return; }
    loading = true;
    $.flickr.loadInteresting(pageNumber)
    .then(function(photos, pageCount) {
      if (pageNumber >= pageCount) {
        $.infinite.remove('flickr-app');
      }
      pageNumber += 1;
      loading = false;
      displayPhotos(photos);
    }, function(error) {
      $.infinite.remove('flickr-app');
      loading = false;
      displayError();
    });
  };

  return {
    run: function() {
      loadPhotos();
      $.infinite.add('flickr-app', loadPhotos);
    }
  }
})();

$(app.run);
