
(function() {
  var myid = 0;
  var capturing = false;

  var host = window.document.location.host.replace(/:.*/, '');
  var ws = new WebSocket('ws://' + host + ':8080');
  //ws.binaryType = 'arraybuffer';
  ws.onopen = function() {
    console.log("WebSocket connected");
  };
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data)
    if (data.type === 'id') {
      myid = data.id;
    } else if (data.type === 'screen') {
      // decompress
      var dec = LZString.decompress(ab2str(data.data));
      document.getElementById('screen_'+data.user).innerHTML = dec;
    }
  };
  ws.onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };

  camera.init({
    width: 100,
    height: 80,
    fps: 15,
    mirror: true,

    onFrame: function(canvas) {
      ascii.fromCanvas(canvas, {
        callback: function(asciiString) {
          document.getElementById('screen_'+myid).innerHTML = asciiString;

          // compress and send
          var res = LZString.compress(asciiString);
          ws.send(str2ab(res));
        }
      });
    },

    onSuccess: function() {
      document.getElementById("info").style.display = "none";

      capturing = true;
      document.getElementById("pause").style.display = "block";
      document.getElementById("pause").onclick = function() {
        if (capturing) {
          camera.pause();
        } else {
          camera.start();
        }
        capturing = !capturing;
      };
    },

    onError: function(error) {
      // TODO: log error
    },

    onNotSupported: function() {
      document.getElementById("info").style.display = "none";
      asciiContainer.style.display = "none";
      document.getElementById("notSupported").style.display = "block";
    }
  });
})();