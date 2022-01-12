var audioGraph;

chrome.tabs.create({url: "index.html", active: true }, tab => {
  audioGraph = tab;
  console.log(tab);
});

chrome.runtime.onMessage.addListener((message, sender) => {
  chrome.tabs.sendMessage(audioGraph.id, message);
});