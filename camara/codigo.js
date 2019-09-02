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

async function init() {

  console.log("id de la fuentey: " + constraints.video.optional[0].sourceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
  } catch (e) {
    errorMsgElement.innerHTML = `navigator.getUserMedia error:${e.toString()}`;
  }
}

var strm;
// Success
function handleSuccess(stream) {
  window.stream = stream;
  video.srcObject = stream;
}

// Load init
async function init() {

  console.log("id de la fuentey: " + constraints.video.optional[0].sourceId);
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      console.log('paso 2');
    }
    navigator.mediaDevices.enumerateDevices().then(function (e) {
      console.log('paso 3');
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
    }).then(async function () {
      console.log('paso 4');
      const stream2 = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream2);
    });

  } catch (e) {
    console.log('no se pudo abrir la camara');
  }
}
//////////////////////


init();
