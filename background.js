var timerTab = 0;
var status = 'off';

function toggleTimer(tab) {
  if (tab.id === timerTab){
    stopTimer(tab.id);
  } else {
    startTimer(tab);
  }
}

function startTimer(tab){
  console.log("startTimer");
  console.log("tab: " + tab + ", tab.id: " + tab.id);
  status = 'on';
  setStatus(tab.id, status);
  injectScript(tab.id);
  chrome.contextMenus.update("skip", {"enabled": true})
  console.log("set tab id to " + tab.id)
  timerTab = tab.id;
}

function updateTab(tabId, changeInfo, tab) {
  if (changeInfo.status == "complete" && tabId == timerTab && status == 'on') {
    setStatus(timerTab, status);
    injectScript(timerTab);
  }
}

function stopTimer(tabId, changeInfo, tab) {
  if (status != 'on'){
    return;
  }
  console.log("stopTimer");
  status = 'off';
  setStatus(timerTab, status);
  chrome.browserAction.setIcon({ path: 'rose-'+status+'.png' });
  chrome.browserAction.setBadgeText({text: ""}); // We have 10+ unread items.
  chrome.contextMenus.update("skip", {"enabled": false})
  timerTab = 0;
}

function injectScript(tabId) {
  console.log("injectScript");
  chrome.tabs.executeScript(tabId, { file: 'inject.min.js'});
}

function setStatus(tabId, statusArg){
  console.log("setStatus(tabId: " + tabId + ", status: " + statusArg + ");");
  chrome.tabs.executeScript(tabId, { code: 'var extension_status = "'+statusArg+'"'});
  chrome.browserAction.setIcon({ path: 'rose-'+statusArg+'.png' });
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
      chrome.browserAction.setBadgeText({text: request.toString()}); // We have 10+ unread items.
      sendResponse({success: "changed badge to " + request});
    }}
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
    console.log(tab);
    console.log(info);
    if (info.menuItemId === "skip"){
      chrome.tabs.executeScript(tab.id, { code: 'i = countdown-1'});
      console.log("i = countdown-1")
    }
})
