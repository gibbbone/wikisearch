document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabId = tabs[0].id;
    chrome.runtime.sendMessage(
      {action: "getSelection", tabId: tabId},
      function(response) {
        const query = response.data;
        const searchBoxDiv = document.getElementById('searchBoxDiv');
        if (query) {
          searchBoxDiv.style.display = 'none';
          performSearch(query);
        } else {
          searchBoxDiv.style.display = 'block';
        }
      }
    );
  });
});

function displayPage(url) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<iframe src="${url}" width="600" height="400"></iframe>`;
}

document.getElementById('searchButton').addEventListener('click', function() {
  const userQuery = document.getElementById('searchBox').value;
  performSearch(userQuery);
});

function performSearch(query) {
  fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${query}&limit=1&namespace=0&format=json&origin=*`)
    .then(response => response.json())
    .then(data => {
      const [_, __, ___, links] = data;
      const firstResultURL = links[0];
      displayPage(firstResultURL);
    });
}