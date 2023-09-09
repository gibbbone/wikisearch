chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == "getSelection") {
      chrome.scripting.executeScript({
        target: { tabId: request.tabId },
        function: function() {
          return window.getSelection().toString();
        }
      }, (selection) => {
        sendResponse({ data: selection[0].result });
      });
      return true; // Required for async sendResponse
    }
  });
  