'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');
let dispositivo;

const constraints = {
    audio: false,
    video: {
      optional: [{sourceId: dispositivo}]
    }
  };
//////////////////////
async function init() {
  
  console.log("id de la fuente: " + constraints.video.optional[0].sourceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}
//////////////////////
navigator.mediaDevices.enumerateDevices().then(function(e) {
  e.forEach(el => {
    if(el.kind == 'videoinput'){
      console.log('index: ' + el.label.indexOf('back'));
      if(el.label.indexOf('back') > 0)
      {
        constraints.video.optional[0].sourceId = el.deviceId;
        console.log('camara:');
        console.log('dispositivo: ' + dispositivo);
      }
    }
  }).then(
    function(e)
    {
      init();
    }
  );
  
});
//////////////////////




// Access webcam


// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init

/* window.setTimeout(function()
{
  console.log("id de la fuente: " + constraints.video.optional[0].sourceId);
  
}, 2000); */

