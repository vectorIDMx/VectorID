////////////////////////////////////////////////////////////////////////////////
//          handle webcam source
////////////////////////////////////////////////////////////////////////////////

hola = function(onReady, onError) {
	var _this = this

	// init default value
	onError = onError || function(error){
		alert('Webcam Error\nName: '+error.name + '\nMessage: '+error.message)
		var event = new CustomEvent('camera-error', {error: error});
		window.dispatchEvent(event);
	}

	var domElement = document.createElement('video');
	domElement.setAttribute('autoplay', '');
	domElement.setAttribute('muted', '');
	domElement.setAttribute('playsinline', '');
	domElement.style.width = '100%'
	domElement.style.height = '100%'

	// check API is available
	if (navigator.mediaDevices === undefined
			|| navigator.mediaDevices.enumerateDevices === undefined
			|| navigator.mediaDevices.getUserMedia === undefined  ){
		if( navigator.mediaDevices === undefined )				var fctName = 'navigator.mediaDevices'
		else if( navigator.mediaDevices.enumerateDevices === undefined )	var fctName = 'navigator.mediaDevices.enumerateDevices'
		else if( navigator.mediaDevices.getUserMedia === undefined )		var fctName = 'navigator.mediaDevices.getUserMedia'
		else console.assert(false)
		onError({
			name: '',
			message: 'WebRTC issue-! '+fctName+' not present in your browser'
		})
		return null
	}

	// get available devices
	navigator.mediaDevices.enumerateDevices().then(function(devices) {
                var userMediaConstraints = {
			audio: false,
			video: {
				facingMode: 'environment',
				width: {
					ideal: _this.parameters.sourceWidth,
					// min: 1024,
					// max: 1920
				},
				height: {
					ideal: _this.parameters.sourceHeight,
					// min: 776,
					// max: 1080
				}
		  	}
		}

		if (null !== _this.parameters.deviceId) {
			userMediaConstraints.video.deviceId = {
				exact: _this.parameters.deviceId
			};
		}

		// get a device which satisfy the constraints
		navigator.mediaDevices.getUserMedia(userMediaConstraints).then(function success(stream) {
			// set the .src of the domElement
            domElement.srcObject = stream;

			var event = new CustomEvent('camera-init', {stream: stream});
			window.dispatchEvent(event);
			// to start the video, when it is possible to start it only on userevent. like in android
			document.body.addEventListener('click', function(){
				domElement.play();
			});
			// domElement.play();

// TODO listen to loadedmetadata instead
			// wait until the video stream is ready
			var interval = setInterval(function() {
				if (!domElement.videoWidth)	return;
				onReady()
				clearInterval(interval)
			}, 1000/50);
		}).catch(function(error) {
			onError({
				name: error.name,
				message: error.message
			});
		});
	}).catch(function(error) {
		onError({
			message: error.message
		});
	});

	return domElement
}
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

