(function(){

  'use strict';

  var promises = (function() {
    var result = [],
        i, len, name;

    for (i = 1, len = 100 + 1; i < len; ++i) {
      name = 'images/' + ('00' + i).slice(-3) + '.jpg';

      result.push(
        loadImage(name)
      );
    }

    return result;
  }());

  var frame = document.getElementById('js-frame'),
      checkbox = document.getElementById('js-checkbox');

  checkbox.addEventListener('change', function(event) {
    setTimeout(function() {
      var value = (event.target.checked) ? 'hidden' : '';
       
      document.body.style.overflow = value;

      frame.style.webkitBackfaceVisibility = value;
      frame.style.mozBackfaceVisibility = value;
      frame.style.backfaceVisibility = value;
    }, 0);
  }, false);

  Promise
    .all(promises)
    .then(function(results) {
      var index = 0;

      function draw() {
        raf(draw);

        if (index >= 100) {
          index = 0;
        }

        frame.style.backgroundPositionY = (-422 * index++) + 'px';
      }
      draw();
    })
    ['catch'](function(err) {
      console.error(err);
    });

}());
