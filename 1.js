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
    .then(function(images) {
      var index = 1;

      function draw() {
        var name;

        raf(draw);

        if (index > 100) {
          index = 1;
        }

        name = 'images/' + ('00' + index++).slice(-3) + '.jpg';

        frame.style.backgroundImage = 'url(' + name + ')';
      }
      draw();
    })
    ['catch'](function(err) {
      console.error(err);
    });

}());
