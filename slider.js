var ul;
var liItems;
var imageWidth;
var imageNumber;
var currentImage = 0;
var accLeft = 0;
var visibleImage = 0; // last visible image so far


// init the ul element ,the image total width, the first image width
function init(){
  // get the image list
  ul = document.getElementById('image_slider');

  // get the first image width, total number of images
  liItems = ul.children;
  imageNumber = liItems.length;
  imageWidth = liItems[0].children[0].offsetWidth;

  // set ul's width as the total width of all images in image slider.
  lazyLoad(); // init the first visible images
  var totalWidth = 0;
  for(var i = 0; i < imageNumber;++i){
    thisImgWidth = liItems[i].children[0].offsetWidth;
    totalWidth += thisImgWidth;

   
    //console.log("ImageNum:" + imageNumber + 
    //  "thisImgWidth:" + thisImgWidth + "totalWidth:" + totalWidth);
  }


  totalWidth += 4000; // as padding
  ul.style.width = totalWidth + 'px';
  ul.style.left = "0px"; // initial position of he first image

}

// given the current image index get the current image width
function getCurrWidth(currentImage){
  img = ul.children[currentImage].children[0];
  // compute the image width plus margin  
  imageWidth = img.offsetWidth + parseInt(window.getComputedStyle(img).margin)*2 ;
  //console.log("image" + currentImage + " width:" + imageWidth);
}


// slide the window to the left
function slider(){ 
  // if we slide to the last image already further button click would bring to the
  // first image 
  if(currentImage == imageNumber-1){
    var leftPosition = (imageNumber - 1) * imageWidth;
     // after 2 seconds, call the goBack function to slide to the first image 
    goBack(leftPosition);
  }else{ // else would keep sliding images
    // get the image width of the current image
    getCurrWidth(currentImage);
  
    // slide to the left of one image
    currLeft = parseInt(window.getComputedStyle(ul).left) - parseInt(imageWidth);
    ul.style.left = currLeft + 'px';

    //console.log("currLeft:" + currLeft);
    currentImage++;
    accLeft += imageWidth;
    
    //TODO: find new visible image as a result of loading and load the image
    lazyLoad(); // check if any image becomes visible 

  }
}

// check starting from the current last visible index 
// and if image is visble load the image and update
// the visibleImage index
function lazyLoad() {
  console.log("visibleiamgeind: " + visibleImage);
  // locate the last visible image
  var img = ul.children[visibleImage].children[0];
  img.src = img.getAttribute("data-src");
  // if the next image is also visble show the image 
  for(;visibleImage < imageNumber && elementInViewport(img);){
    // change the src attributes to data src to show image
    visibleImage++;
    img.src = img.getAttribute("data-src");
    img = ul.children[visibleImage].children[0];
  }
  console.log("final visibleImage: ", visibleImage);
}

// go back to the first slide
function goBack(leftPosition){
    ul.style.left = "0px";
    currentImage = 0;
    accLeft = 0;
    visibleImage = 0;
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

// init function call 
window.onload = init;

