import "../img/icon-128.png";
import "../img/icon-34.png";

function postData(url, data) {
  chrome.tabs.create({ url: chrome.runtime.getURL("form.html") }, function(
    tab
  ) {
    var handler = function(tabId, changeInfo) {
      if (tabId === tab.id && changeInfo.status === "complete") {
        chrome.tabs.onUpdated.removeListener(handler);
        chrome.tabs.sendMessage(tabId, { url: url, data: data });
      }
    };

    // in case we're faster than page load (usually):
    chrome.tabs.onUpdated.addListener(handler);
    // just in case we're too late with the listener:
    chrome.tabs.sendMessage(tab.id, { url: url, data: data });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  postData(request.url, { jwt_token: request.token });
});
