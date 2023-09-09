document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabId = tabs[0].id;
    chrome.runtime.sendMessage(
      {action: "getSelection", tabId: tabId},
      function(response) {
        const query = response.data;
        if (query) {
          fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=1&namespace=0&format=json&origin=*`)
            .then(response => response.json())
            .then(data => {
              const [_, __, ___, links] = data;
              const firstResultURL = links[0];
              displayPage(firstResultURL);
            });
        }
      }
    );
  });
});

function displayPage(url) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<iframe src="${url}" width="600" height="400"></iframe>`;
}
