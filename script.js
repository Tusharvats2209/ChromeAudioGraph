var aC = new window.AudioContext();
var sink = aC.createMediaStreamDestination();
var src = aC.createMediaElementSource(document.querySelector('video'));

src.connect(sink);
// src.connect(aC.destination);

var peer = new Peer();
peer.on('open', function(id) {
  // alert(id);
  chrome.runtime.sendMessage({peerId: id});
});
peer.on('call', function(call) {
  call.answer(sink.stream);
  call.on('stream', function(stream) {
    console.log(`dummy oscillator stream : ${stream}, painful to ears, please ignore, its just a work around`);
  });
});
console.log(peer);