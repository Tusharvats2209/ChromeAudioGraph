var peer = new Peer();

var audioCtx = new AudioContext(), source;

document.getElementById('init').addEventListener("click", () => {audioCtx.resume();});

var vid = document.querySelector('video');

const dummmyStream = audioCtx.createOscillator();
var dummySink = audioCtx.createMediaStreamDestination();
dummmyStream.type = 'square';
dummmyStream.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
dummmyStream.connect(dummySink);
dummmyStream.start();

function hookNewNode(client) {
  var call = peer.call(`${client.peerId}`,dummySink.stream);
  call.on('stream', function(stream) {  
    vid.srcObject = stream;
    vid.onloadedmetadata = function(e) {
    vid.play();
      vid.muted = true;
    };
    source = audioCtx.createMediaStreamSource(stream);
    source.connect(audioCtx.destination);
  });
}

chrome.runtime.onMessage.addListener((message) => {
  hookNewNode(message);
});
