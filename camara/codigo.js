'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');
let dispositivo;

//////////////////////
navigator.mediaDevices.enumerateDevices().then(function(e) {
  e.forEach(el => {
    if(el.kind == 'videoinput'){
      console.log('index: ' + el.label.indexOf('back'));
      if(el.label.indexOf('back') > 0)
      {
        dispositivo = el.deviceId;
        console.log('camara:');
        console.log('dispositivo: '+dispositivo);
      }
    }
  });
  
});
//////////////////////


const constraints = {
  audio: false,
  video: {
    optional: [{
      sourceId: dispositivo
    }]
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


