'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');


const constraints = {
  audio: false,
  video: {
    width: 1280, height: 720
  }
};

// Access webcam
async function init() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
init();

// Draw image
/* var context = canvas.getContext('2d');
snap.addEventListener("click", function() {
        context.drawImage(video, 0, 0, 640, 480);
}); */

/* if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {
  alert('This browser does not support MediaStreamTrack.getSources().');
} else {
  navigator.mediaDevices.enumerateDevices().then(function(e) {
    console.log(e);
  });
}
 */
navigator.mediaDevices.enumerateDevices().then(function(e) {
  e.forEach(el => {
    if(el.kind == 'videoinput'){
      console.log('index: ' + el.label.indexOf('back'));
      if(el.label.indexOf('back') > 0)
      {
        console.log('camara:');
        console.log(el);
      }
    }
  });
  let camaras = e.filter(el => {
    if(el.kind == 'videoinput'){
      return el;
    }
  });
  console.log(camaras);
  
});