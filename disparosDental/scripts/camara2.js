
var hola = function(configuration) {
  console.log('inicia camara');
var facing = configuration.facingMode || 'environment';

var onSuccess = configuration.onSuccess;
var onError = configuration.onError || function(err) { console.error("ARController.getUserMedia", err); };

//var video = document.createElement('video');
var video = document.getElementById('video');

var initProgress = function() {
  if (this.videoWidth !== 0) {
    onSuccess(video);
  }
};

var readyToPlay = false;
var eventNames = [
  'touchstart', 'touchend', 'touchmove', 'touchcancel',
  'click', 'mousedown', 'mouseup', 'mousemove',
  'keydown', 'keyup', 'keypress', 'scroll'
];
var play = function(ev) {
  if (readyToPlay) {
    video.play();
    if (!video.paused) {
      eventNames.forEach(function(eventName) {
        window.removeEventListener(eventName, play, true);
      });
    }
  }
};
eventNames.forEach(function(eventName) {
  window.addEventListener(eventName, play, true);
});

var success = function(stream) {
  video.addEventListener('loadedmetadata', initProgress, false);
  //video.src = window.URL.createObjectURL(stream);
  try {
    video.srcObject = stream;
  } catch (error) {
    video.src = window.URL.createObjectURL(stream);
  }
  
  readyToPlay = true;
  play(); // Try playing without user input, should work on non-Android Chrome
};

var constraints = {};
var mediaDevicesConstraints = {};
if (configuration.width) {
  mediaDevicesConstraints.width = configuration.width;
  if (typeof configuration.width === 'object') {
    if (configuration.width.max) {
      constraints.maxWidth = configuration.width.max;
    }
    if (configuration.width.min) {
      constraints.minWidth = configuration.width.max;
    }
  } else {
    constraints.maxWidth = configuration.width;
  }
}

if (configuration.height) {
  mediaDevicesConstraints.height = configuration.height;
  if (typeof configuration.height === 'object') {
    if (configuration.height.max) {
      constraints.maxHeight = configuration.height.max;
    }
    if (configuration.height.min) {
      constraints.minHeight = configuration.height.max;
    }
  } else {
    constraints.maxHeight = configuration.height;
  }
}

mediaDevicesConstraints.facingMode = facing;

navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
var hdConstraints = {
  audio: false,
  video: {
    mandatory: constraints
    }
};

if ( false ) {
// if ( navigator.mediaDevices || window.MediaStreamTrack) {
  if (navigator.mediaDevices) {
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: mediaDevicesConstraints
    }).then(success, onError); 
  } else {
    MediaStreamTrack.getSources(function(sources) {
      var facingDir = mediaDevicesConstraints.facingMode;
      if (facing && facing.exact) {
        facingDir = facing.exact;
      }
      for (var i=0; i<sources.length; i++) {
        if (sources[i].kind === 'video' && sources[i].facing === facingDir) {
          hdConstraints.video.mandatory.sourceId = sources[i].id;
          break;
        }
      }
      if (facing && facing.exact && !hdConstraints.video.mandatory.sourceId) {
        onError('Failed to get camera facing the wanted direction');
      } else {
        if (navigator.getUserMedia) {
          navigator.getUserMedia(hdConstraints, success, onError);
        } else {
          onError('navigator.getUserMedia is not supported on your browser');
        }
      }
    });
  }
} else {
  if (navigator.getUserMedia) {
    navigator.getUserMedia(hdConstraints, success, onError);
  } else {
    onError('navigator.getUserMedia is not supported on your browser');
  }
}

return video;
};
//////////////////////

/* window.setTimeout(function () {
  console.log(haySensor);
  
},500); */
function startGame(){
  //init();
  hola({
    onSuccess: function(video) {
      console.log("Got video", video);
    }
  });
  document.getElementById('instrucciones').style.display = 'none';
  if (haySensor) {
    iniciaJuego();
  } else {
    /* console.log('ejecuta esto');
    const cielo = document.getElementById('skyCont')//.innerHTML = `<a-sky src="#sky"></a-sky>`;
    cielo.innerHTML = `<a-sky src="#sky"></a-sky>`; */
    //document.getElementById('global').setAttribute('rotation',{x:0, y:0, z:0});  
    showVentana(ventanaContent[3]);
    document.getElementById('dedo').setAttribute('width',.017);
    document.getElementById('dedo').setAttribute('height',.02);
  }
}

