var ul;
var liItems;
var imageWidth;
var imageNumber;
var currentImage = 0;

function init(){
    ul = document.getElementById('image_slider');
    liItems = ul.children;
    imageNumber = liItems.length;
    imageWidth = liItems[0].children[0].offsetWidth;
    // set ul's width as the total width of all images in image slider.
    ul.style.width = parseInt(imageWidth * imageNumber) + 'px';
    slider(ul);
}

// given the current image index get the current image width
function getCurrWidth(currentImage){
  liItems = ul.children;
  imageNumber = liItems.length;
  imageWidth = liItems[currentImage].children[0].offsetWidth;
  console.log("curr width:" + imageWidth);
}


/**delta function is to set how the image slide—keep still for a while and move to next picture.
*step function will be called many times until clearInterval() been called
* currentImage * imageWidth is the currentImage position of ul
* delta start from 0 to 1, delta * imageWidth is the pixels that changes
**/
function slider(ul){ 
  // get the image width of the current image
  getCurrWidth(currentImage);

  animate({
      delay:17,
      duration: 3000,
      delta:function(p){return Math.max(0, -1 + 2 * p)},
      step:function(delta){
          ul.style.left = '-' + parseInt(currentImage * imageWidth + delta * imageWidth) + 'px';
      },

      callback:function(){
        currentImage++;
        // if it doesn't slied to the last image, keep sliding
        if(currentImage < imageNumber-1){
          slider(ul);
        }
        // if current image it's the last one, it slides back to the first one
        else{
          var leftPosition = (imageNumber - 1) * imageWidth;
           // after 2 seconds, call the goBack function to slide to the first image 
          setTimeout(function(){goBack(leftPosition)},2000); 
          setTimeout(function(){slider(ul)}, 4000);
        }
      }
  });
}

//generic animate function
function animate(opts){
    var start = new Date;
    var id = setInterval(function(){
        var timePassed = new Date - start;
        var progress = timePassed / opts.duration
        if(progress > 1){
            progress = 1;
        }
        var delta = opts.delta(progress);
        opts.step(delta);
        if (progress == 1){
            clearInterval(id);
           opts.callback();
         }
    }, opts.dalay || 17);
}

// go back to the first slide
function goBack(leftPosition){
    currentImage = 0;
    var id = setInterval(function(){
        if(leftPosition >= 0){
            ul.style.left = '-' + parseInt(leftPosition) + 'px';
            leftPosition -= imageWidth / 10;
        }
        else{
            clearInterval(id);
        }
    }, 17);
}

// to check if element is in view port
function elementInViewport2(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
}

window.onload = init;


//------------------------------------------------------
/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */

;(function($) {

  $.fn.unveil = function(threshold, callback) {

    var $w = $(window),
        th = threshold || 0,
        retina = window.devicePixelRatio > 1,
        attrib = retina? "data-src-retina" : "data-src",
        images = this,
        loaded;

    this.one("unveil", function() {
      var source = this.getAttribute(attrib);
      source = source || this.getAttribute("data-src");
      if (source) {
        this.setAttribute("src", source);
        if (typeof callback === "function") callback.call(this);
      }
    });

    function unveil() {
      var inview = images.filter(function() {
        var $e = $(this);
        if ($e.is(":hidden")) return;

        var wt = $w.scrollTop(),
            wb = wt + $w.height(),
            et = $e.offset().top,
            eb = et + $e.height();

        return eb >= wt - th && et <= wb + th;
      });

      loaded = inview.trigger("unveil");
      images = images.not(loaded);
    }

    $w.on("scroll.unveil resize.unveil lookup.unveil", unveil);

    unveil();

    return this;

  };

})(window.jQuery || window.Zepto);


