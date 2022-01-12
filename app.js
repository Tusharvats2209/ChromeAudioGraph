var peer = new Peer();

var audioCtx = new AudioContext(), source;

document.getElementById('init').addEventListener("click", () => {audioCtx.resume();});   // this sucks

var vid = document.querySelector('video');
const oscillator = audioCtx.createOscillator();
var sink = audioCtx.createMediaStreamDestination();
oscillator.type = 'square';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz
oscillator.connect(sink);
oscillator.start();

function hookNewNode(client) {
  var call = peer.call(`${client.peerId}`,sink.stream);
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

// vid can dump previous srcObject to grab the new connection, the previous stream would still remain hooked to the web audio graph, cool little hack, huh!!
// hope no vid elements are required in the future!

// var call = peer.call('',sink.stream);
// call.on('stream', function(stream) {  
//   document.querySelector()
//   vid.srcObject = stream;
//   vid.onloadedmetadata = function(e) {
//   vid.play();
//     vid.muted = true;
//   };
//   source = audioCtx.createMediaStreamSource(stream);
//   source.connect(audioCtx.destination);
// });