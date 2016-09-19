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

  var canvas = document.getElementById('js-canvas');

  var frame = document.getElementById('js-frame'),
      checkbox = document.getElementById('js-checkbox');

  checkbox.addEventListener('change', function(event) {
    setTimeout(function() {
      var value = (event.target.checked) ? 'hidden' : '';
       
      document.body.style.overflow = value;

      canvas.style.webkitBackfaceVisibility = value;
      canvas.style.mozBackfaceVisibility = value;
      canvas.style.backfaceVisibility = value;
    }, 0);
  }, false);

  Promise
    .all(promises)
    .then(function(results) {
      images = results;

      var index = 0,
          context = canvas.getContext('2d');

      function draw() {
        raf(draw);

        if (index >= 100) {
          index = 0;
        }

        context.drawImage(images[index++], 0, 0);
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

    canvas.style.top = style.top;
    canvas.style.left = style.left;
    canvas.style.width = style.width;
    canvas.style.height = style.height;
    canvas.style.marginTop = style.marginTop;
    canvas.style.marginLeft = style.marginLeft;
  }

  window.addEventListener('resize', setImageSize, false);

}());
