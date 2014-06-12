$.flickr = (function() {
  var photoURL = function(photo, type) {
    return 'https://farm' +
      photo.farm + '.staticflickr.com/' +
      photo.server + '/' +
      photo.id + '_' +
      photo.secret + '_' + type + '.jpg';
  };

  return {
    loadInteresting: function(page) {
      var dfd = new $.Deferred();
      var url = 'http://api.flickr.com/services/rest/';
      var params = {
        method: 'flickr.interestingness.getList',
        api_key: 'f40bc3eb64e080641d1c2a83103de6d8',
        format: 'json',
        per_page: 80,
        page: page
      };
      $.ajax(url, {
        data: params,
        dataType: 'jsonp',
        jsonp: 'jsoncallback'
      })
      .then(function(data, status, xhr) {
        var photos = data.photos.photo.map(function(photo) {
          return {
            url: photoURL(photo, 'b'),
            thumbnailURL: photoURL(photo, 'q'),
            title: photo.title,
            _photo: photo
          };
        });
        dfd.resolve(photos, data.photos.pages);
      }, function(xhr, status, error) {
        dfd.reject(error);
      });
      return dfd.promise();
    }
  }
})();
