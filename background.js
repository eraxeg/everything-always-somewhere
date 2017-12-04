var timerTab = 0;
var status = 'off';
var initialChange;
var hello;

function restoreOptions() {
  chrome.storage.sync.get({
    initialChange: true
  }, function(items) {
    initialChange = items.initialChange;
  });
}
restoreOptions();

function toggleTimer(tab) {
  if (tab.id === timerTab){
    stopTimer(tab.id);
  } else {
    startTimer(tab);
    if (initialChange){
      var script = 'changePage(randomWebsite());';
      chrome.tabs.executeScript(timerTab, {code: script});
    }
  }
}

function startTimer(tab){
  setStatus(tab.id, 'on');
  injectScript(tab.id);
  chrome.contextMenus.update("skip", {"enabled": true})
  timerTab = tab.id;
}

function updateTab(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tabId == timerTab && status == 'on') {
    setStatus(timerTab, status);
    injectScript(timerTab);
  }
}

function stopTimer(tabId, changeInfo, tab) {
  if (status != 'on'){return;}
  setStatus(timerTab, 'off');
  chrome.browserAction.setIcon({ path: 'icons/rose-' + status + '.png' });
  chrome.browserAction.setBadgeText({text: ""});
  chrome.contextMenus.update("skip", {"enabled": false})
  timerTab = 0;
}

function injectScript(tabId) {
  chrome.tabs.executeScript(tabId, { file: 'inject.js'}, function () {
    if(chrome.runtime.lastError) {
      alert("Whoops... " + chrome.runtime.lastError.message +
        "\n\nThe timer needs a tab with a url starting with http:// to work.");
      stopTimer(tabId);
    } else {
      // move on
    }
});
}

function setStatus(tabId, statusArg){
  status = statusArg;
  chrome.tabs.executeScript(tabId, { code: 'var extension_status = "' + status + '"'});
  chrome.browserAction.setIcon({ path: 'icons/rose-' + status + '.png' });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (timerTab === 0) {
      return;
    } else if (request.url){
      var script = 'window.location.replace("' + request.url + '");';
      chrome.tabs.executeScript(timerTab, {code: script});
      sendResponse({success: "changed url to " + request.url});
      setStatus(timerTab, 'on');
      injectScript(timerTab);
    } else {
      chrome.browserAction.setBadgeText({text: request.toString()});
      sendResponse({success: "changed badge to " + request});
    }
  }
);

chrome.browserAction.onClicked.addListener(function(tab) {toggleTimer(tab);});
chrome.tabs.onUpdated.addListener(updateTab);
chrome.tabs.onActivated.addListener(stopTimer);
chrome.browserAction.setBadgeBackgroundColor({color: [51, 153, 51, 255]});

chrome.contextMenus.create({
  "id":"skip",
  "enabled":false,
  "title":"Skip",
  "contexts":["browser_action"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "skip"){
    chrome.tabs.executeScript(tab.id, { code: 'i = countdown-1'});
  }
})
