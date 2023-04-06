chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var url = tabs[0].url;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          var result = response.result;
          // Create a new HTML element to display the result
          var div = document.createElement('div');
          div.textContent = result;
          document.body.appendChild(div);
        } else {
          // Show an error message in a popup
          alert('Error: ' + xhr.statusText);
        }
      }
    };
    xhr.open('POST', 'http://localhost:5000/predict');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({links: [url]}));
  });
  