
var isTargetFound = false;
var interacted = false;
var cuenta2 = 0;
AFRAME.registerComponent("markerhandler", {
    init: function () {
        console.log('markerhandler-init');

        markerObj = document.querySelector('a-marker');
        markerObj.hidden = true;

        //dino.setAttribute('animation-mixer', {clip: 'C4D Animation Take', loop: 'repeat'});
    },

    tick: function () {

        if (markerObj != null) {
            if (markerObj.object3D.visible == true) {

                if (isTargetFound)
                    return;

                isTargetFound = true;
                console.log("marker visible");
                cuenta2++;
                if (cuenta2 == 1) {
                    document.getElementById("qr").emit("qrout");
                    document.getElementById("plane").emit("planeout");

                }
                document.getElementById("ring").emit("ringOut");
                /* window.setTimeout(function()
                {
                    document.getElementById("ring").emit("ringKeepTurn");
                },2500); */
                document.getElementById("ring").addEventListener('animationcomplete__gira1', function () {
                    document.getElementById("redes").emit("redCrece");
                    document.getElementById("ring").emit("ringKeepTurn");
                    window.setTimeout(function () {
                        document.getElementById("box2").emit("boxRueda");
                        document.getElementById("box3").emit("boxRueda");
                        document.getElementById("box4").emit("boxRueda");
                        document.getElementById("box5").emit("boxRueda");
                    }, 2000);

                })

                document.querySelector('#logoEmpresa').emit('startLogoE');
                window.setInterval(function () {
                    document.querySelector('#logoEmpresa').emit('startGiroLogoE');
                }, 10000);

            }
            else {

                if (!isTargetFound)
                    return;

                isTargetFound = false;
                console.log("marker invisible");

            }
        }
    }
});
