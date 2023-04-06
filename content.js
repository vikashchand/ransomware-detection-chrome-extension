var links = [];
var a_tags = document.getElementsByTagName("a");
for (var i = 0; i < a_tags.length; i++) {
    links.push(a_tags[i].href);
}

var port = chrome.runtime.connect({name: "phishing_detection"});
port.postMessage({links: links});
port.onMessage.addListener(function(response) {
    alert(response.result);
    port.disconnect();
});
