var timerTab = 0; // keep track of the tab
var status = 'off';
var initialChange;

// gets value of initialChange from chrome storage
function restoreOptions() {
  chrome.storage.sync.get({
    initialChange: true // set to true if there is no value in storage
  }, function(items) {
    initialChange = items.initialChange;
  });
}

restoreOptions();

// the method which is called when clicking the extension icon
function toggleTimer(tab) {
  // if timerTab is not 0 then the timer is active
  // change to if timerTab != 0?
  if (tab.id === timerTab){
    stopTimer(tab.id);
  } else {
    startTimer(tab);
    // if initialChange is on, change the page
    // immediately when timer is turned on
    if (initialChange){
      // get url
      chrome.tabs.get(timerTab, function (tab) {
        // callback: send message with current url
        // console.log("sending current url: " + tab.url);
        chrome.tabs.sendMessage(timerTab, {success: true, tabUrl: tab.url}, function(){
          // the listener in the content script sets the currentId when getting
          // the tabUrl. this enables the timer to change to the next website
          // even when the website has been chosen manually (by writing the url)
          var script = 'changePage(getWebsite());'; // currentId is used in getWebsite()
          chrome.tabs.executeScript(timerTab, {code: script});
        });
      });
    }
  }
}

function startTimer(tab){
  setStatus(tab.id, 'on');
  injectScript(tab.id);
  chrome.contextMenus.update("skip", {"enabled": true}) // enables skipping
  timerTab = tab.id;
}

function stopTimer(tabId, changeInfo, tab) {
  if (status != 'on'){return;}
  setStatus(timerTab, 'off');
  chrome.browserAction.setIcon({ path: 'icons/rose-' + status + '.png' });
  chrome.browserAction.setBadgeText({text: ""});
  chrome.contextMenus.update("skip", {"enabled": false})
  timerTab = 0;
}

// this runs onUpdated (Fired when a tab is updated.)
function updateTab(tabId, changeInfo, tab) {
  if (changeInfo === undefined){return;}
  if (changeInfo.status == "complete" && tabId == timerTab && status == 'on') {
    setStatus(timerTab, status);
    injectScript(timerTab);
  }
}

function injectScript(tabId) {
  chrome.tabs.executeScript(tabId, { file: 'inject.js'}, function () {
    // See if there is an exception (usually caused
    // by launching in a chrome:// url)
    if(chrome.runtime.lastError) {
      alert("Oops... " + chrome.runtime.lastError.message +
        "\n\nThe timer needs a tab with a url starting with http:// to work.");
      stopTimer(tabId);
    }
});
}

function setStatus(tabId, statusArg){
  status = statusArg;
  chrome.tabs.executeScript(tabId, { code: 'var extension_status = "' + status + '"'});
  chrome.browserAction.setIcon({ path: 'icons/rose-' + status + '.png' });
}

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (timerTab === 0) {
      return;
    } else if (message.url){
      // change window.location to the received url
      var script = 'window.location.replace("' + message.url + '");';
      chrome.tabs.executeScript(timerTab, {code: script});
      sendResponse({success: "changed url to " + message.url});
      chrome.browserAction.setBadgeText({text: ""});
      updateTab(timerTab);
    } else if (message.getUrl){
      chrome.tabs.get(timerTab, function (tab) {
        chrome.tabs.sendMessage(timerTab, {success: true, tabUrl: tab.url});
      });
    } else {
      chrome.browserAction.setBadgeText({text: message.toString()});
      sendResponse({success: "changed badge to " + message});
    }
  }
);

chrome.browserAction.onClicked.addListener(function(tab) {toggleTimer(tab);});
chrome.tabs.onUpdated.addListener(updateTab);
chrome.tabs.onActivated.addListener(stopTimer);
chrome.browserAction.setBadgeBackgroundColor({color: [51, 153, 51, 255]});

// TODO add toggle between sequential and random here
chrome.contextMenus.create({
  "id":"skip",
  "enabled":false,
  "title":"Skip",
  "contexts":["browser_action"]
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "skip"){
    chrome.tabs.executeScript(tab.id, { code: 'i = countdown - 1'});
  }
})
