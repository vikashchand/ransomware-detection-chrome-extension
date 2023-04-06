chrome.runtime.onConnect.addListener(function(port) {
  console.assert(port.name == "phishing_detection");
  port.onMessage.addListener(function(request) {
      fetch("http://localhost:5000/predict", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(request)
      })
      .then(response => response.json())
      .then(data => {
          port.postMessage({result: data.result});
      })
      .catch(error => {
          console.log(error);
      });
  });
});
