$.infinite = (function() {
  var handlers = {};
  var $window = $(window);
  var $document = $(document);

  $document.on('scroll', function(event) {
    var location = $window.scrollTop() + $window.height();
    var nearBottom = location > $document.height() - 300;
    if (nearBottom) {
      Object.keys(handlers).forEach(function(name) {
        var handler = handlers[name];
        handler(event);
      });
    }
  });

  return {
    add: function(name, handler) { handlers[name] = handler; },
    remove: function(name) { delete handlers[name]; }
  }
})();
