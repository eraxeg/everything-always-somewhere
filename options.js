function saveOptions() {
  var timeValue = document.getElementById('countdown').value;
  var changeValue = document.getElementById('initialChange').checked;
  var epilepticValue = document.getElementById('epilepticEnable').checked;
  var flashEnabled = document.getElementById('flashEnable').checked;
  var sequentialValue = document.getElementById('sequentialEnable').checked;

  chrome.storage.sync.set({
    countdown: timeValue,
    initialChange: changeValue,
    epilepticEnable: epilepticValue,
    flash: flashEnabled,
    sequentialEnable: sequentialValue
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Settings saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

var defaults = {
  countdown: 16,
  initialChange: true,
  epilepticEnable: true,
  flash: false,
  sequentialEnable: false
}

function setDefaults(){
  chrome.storage.sync.set(defaults, function(items) {
    document.getElementById('countdown').value = defaults.countdown;
    document.getElementById('initialChange').checked = defaults.initialChange;
    document.getElementById('epilepticEnable').checked = defaults.epilepticEnable;
    document.getElementById('flashEnable').checked = defaults.flash;
    document.getElementById('sequentialEnable').checked = defaults.sequentialEnable;
    document.getElementById('sequentialDisable').checked = !defaults.sequentialEnable;
    var status = document.getElementById('status');
    status.textContent = 'Reset to default values.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get(defaults, function(items) {
    document.getElementById('countdown').value = items.countdown;
    document.getElementById('initialChange').checked = items.initialChange;
    document.getElementById('epilepticEnable').checked = items.epilepticEnable;
    document.getElementById('flashEnable').checked = items.flash;
    document.getElementById('sequentialEnable').checked = items.sequentialEnable;
    document.getElementById('sequentialDisable').checked = !items.sequentialEnable;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('restore').addEventListener('click', setDefaults);
