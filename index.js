(function(){

  'use strict';

  var frameImages = [];

  var cacheButton = document.getElementById('js-button-cache'),
      cacheLabel = document.getElementById('js-label-cache');

  cacheButton.addEventListener('click', function(event) {
    var ps = [];

    cacheButton.disabled = true;

    _.times(406, function(index) {
      var file = './images/' + _.padStart(index + 1, 3, '0') + '.jpg';

      ps.push(
        loadImage(file)
      );
    });

    Promise
      .all(ps)
      .then(function(images) {
        console.log(images);

        frameImages = images;
        cacheLabel.innerHTML = 'cached';

        cacheButton.disabled = false;
      })
      ['catch'](function(err) {
        console.error('failed to cache');
        console.error(err);

        cacheLabel.innerHTML = 'failed to cache';

        cacheButton.disabled = false;
      });
  }, false);

}());
