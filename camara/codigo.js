'use strict';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById("snap");
const errorMsgElement = document.querySelector('span#errorMsg');
let dispositivo;

const constraints = {
  audio: false,
  mandatory: {
    "minWidth": 1280,
    "minHeight": 720
  },
  video: {
    optional: [
      {
        sourceId: dispositivo
      }
    ]
  }
};
//////////////////////
/* async function init() {
  
  console.log("id de la fuentey: " + constraints.video.optional[0].sourceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}
//////////////////////
const streamert = await navigator.mediaDevices.enumerateDevices().then(function(e) {
  e.forEach(el => {
    if(el.kind == 'videoinput'){
      console.log('index: ' + el.label.indexOf('back'));
      if(el.label.indexOf('back') > 0)
      {
        constraints.video.optional[0].sourceId = el.deviceId;
        console.log('camara:');
        console.log('dispositivo: ' + constraints.video.optional[0].sourceId);
      }
    }
  })  
}).then(
  function(e)
  {
    init();
  }); */
//////////////////////
async function init() {

  console.log("id de la fuentey: " + constraints.video.optional[0].sourceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}
//////////////////////


/* const streamert = await navigator.mediaDevices.enumerateDevices().then(function(e) {
    e.forEach(el => {
      if(el.kind == 'videoinput'){
        console.log('index: ' + el.label.indexOf('back'));
        if(el.label.indexOf('back') > 0)
        {
          constraints.video.optional[0].sourceId = el.deviceId;
          console.log('camara:');
          console.log('dispositivo: ' + constraints.video.optional[0].sourceId);
        }
      }
    })  
  }); */

// Access webcam


// Success
function handleSuccess(stream) {

  if (stream) {
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
  navigator.mediaDevices.enumerateDevices().then(function (e) {
    e.forEach(el => {
      if (el.kind == 'videoinput') {
        console.log('id: ' + el.deviceId);
        console.log('index: ' + el.label.indexOf('back'));
        if (el.label.indexOf('back') > 0) {
          constraints.video.optional[0].sourceId = el.deviceId;
          console.log('dispositivo: ' + constraints.video.optional[0].sourceId);
        }
      }
    });


  });
  // Mostrar el nuevo stream con el dispositivo seleccionado
  const strm = navigator.mediaDevices.getUserMedia(constraints);

  window.stream = strm;
  video.srcObject = strm;
  console.log('nueva camara fijada');

}

// Load init
async function init() {

  console.log("id de la fuentey: " + constraints.video.optional[0].sourceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    //errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
    console.log('no se pudo abrir la camara');
  }
}
//////////////////////


init();
/* window.setTimeout(function()
{
  console.log("id de la fuente: " + constraints.video.optional[0].sourceId);

}, 2000); */
