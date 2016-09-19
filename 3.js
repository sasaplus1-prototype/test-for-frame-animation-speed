(function(){

  'use strict';

  var images;

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

  var image = document.getElementById('js-image');

  var frame = document.getElementById('js-frame'),
      checkbox = document.getElementById('js-checkbox');

  checkbox.addEventListener('change', function(event) {
    setTimeout(function() {
      var value = (event.target.checked) ? 'hidden' : '';
       
      document.body.style.overflow = value;

      image.style.webkitBackfaceVisibility = value;
      image.style.mozBackfaceVisibility = value;
      image.style.backfaceVisibility = value;
    }, 0);
  }, false);

  Promise
    .all(promises)
    .then(function(results) {
      images = results;

      var index = 1;

      function draw() {
        var name;

        raf(draw);

        if (index > 100) {
          index = 1;
        }

        name = 'images/' + ('00' + index++).slice(-3) + '.jpg';
        image.src = name;
      }
      draw();
    })
    .then(function() {
      setImageSize();
    })
    ['catch'](function(err) {
      console.error(err);
    });

  function setImageSize() {
    var style = coverStyle.get({
      elementWidth: images[0].naturalWidth,
      elementHeight: images[0].naturalHeight,
      containerWidth: frame.scrollWidth,
      containerHeight: frame.scrollHeight
    });

    image.style.top = style.top;
    image.style.left = style.left;
    image.style.width = style.width;
    image.style.height = style.height;
    image.style.marginTop = style.marginTop;
    image.style.marginLeft = style.marginLeft;
  }

  window.addEventListener('resize', setImageSize, false);

}());
