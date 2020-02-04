var ul;
var liItems;
var imageWidth;
var imageNumber;
var currentImage = 0;
var accLeft = 0;
var visibleImage = 0; // last visible image so far
var imgMark = {}; // record the pixel break point of each image start


// init the ul element ,the image total width, the first image width
function init(){
  // get the image list
  ul = document.getElementById('image_slider');

  // get the first image width, total number of images
  liItems = ul.children;
  imageNumber = liItems.length;
  imageWidth = liItems[0].children[0].offsetWidth;

  // set ul's width as the total width of all images in image slider.
  lazyLoad(2); // init the first visible images
  var totalWidth = 0;
  for(var i = 0; i < imageNumber;++i){
    thisImgWidth = getCurrWidth(i); 
    totalWidth += thisImgWidth;
    imgMark[i] = totalWidth -  thisImgWidth;
   
    //console.log("i:" + i + "; " + 
    //  "thisImgWidth:" + thisImgWidth + " ;"+  "totalWidth:" + totalWidth);
  }


  totalWidth += 4000; // as padding
  ul.style.width = totalWidth + 'px';
  ul.style.left = "0px"; // initial position of he first image

}

// check if curent image will be showing in the window given its image index
function inWindow(indx){
  return  0 <= imgMark[indx] - accLeft <= window.screen.width;
}
// given the current image index get the current image width
function getCurrWidth(currentImage){
  img = ul.children[currentImage].children[0];
  // compute the image width plus margin  
  imageWidth = parseInt(window.getComputedStyle(img).width) + parseInt(window.getComputedStyle(img).margin)*2 ;
  //console.log("image" + currentImage + " width:" + imageWidth);
  return imageWidth;
}


// slide the window to the left
function slider(){ 
  // if we slide to the last image already further button click would bring to the
  // first image 
  console.log("currImag:" + currentImage);
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
    lazyLoad(2); // check if any image becomes visible 
    setTimeout(lazyLoad, 600); // delay for the slide animation to confirm visible image

  }
}

// and if image is visble load the image and update
function lazyLoad(num) {
  // locate the last visible image
  var img = ul.children[currentImage].children[0];
  for(var i = currentImage; i < imageNumber;i++){

    if(elementInViewport(img)){
      // console.log("i:" + i , "visible:" + elementInViewport(img))
      img = ul.children[i].children[0];
      img.src = img.getAttribute("data-src");
    } else{
      // continue load image that even not seen now
      for(var j= i; j < imageNumber && j < i+ num;j++){
        img = ul.children[j].children[0];
        img.src = img.getAttribute("data-src");
      }
      break;
    }
  }
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
window.addEventListener('load', function () {
  init();
})
// window.onload = init;

