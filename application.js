window.FlickrApp = Ember.Application.create();

var photoURL = function(photo, type) {
  return 'https://farm' +
    photo.farm + '.staticflickr.com/' +
    photo.server + '/' +
    photo.id + '_' +
    photo.secret + '_' + type + '.jpg';
};

FlickrApp.IndexRoute = Ember.Route.extend({
  model: function() {
    var url = 'http://api.flickr.com/services/rest/';
    var params = {
      method: 'flickr.interestingness.getList',
      api_key: 'f40bc3eb64e080641d1c2a83103de6d8',
      format: 'json',
      per_page: 80
    };
    return $.ajax(url, {
      data: params,
      dataType: 'jsonp',
      jsonp: 'jsoncallback'
    }).then(function(data, status, xhr) {
      return data.photos.photo.map(function(photo) {
        return {
          url: photoURL(photo, 'b'),
          thumbnailURL: photoURL(photo, 'q'),
          title: photo.title,
          _photo: photo
        };
      });
    });
  }
});
