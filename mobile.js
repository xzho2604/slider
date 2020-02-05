

 // given a div load large image to the div
function mloadLarge(div) {
  var imgLarge = new Image();
  imgLarge.src = div.getAttribute("data-src");
  imgLarge.onload = function () {
    imgLarge.classList.add('loaded');
  };
  imgLarge.classList.add('picture');

  div.appendChild(imgLarge);
}

// to check if element is in view port
function elementInViewport(el) {
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


function showVisible() {
  console.log("inside visible")
  var divs= document.getElementsByClassName('image-container');
  for(var i = 0; i < divs.length; i++) {
    if (elementInViewport(divs[i])) {
      mloadLarge(divs[i]);
    }
  }
}

window.onscroll = showVisible;
window.onload = showVisible;



