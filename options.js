function saveOptions() {
  var timeValue = document.getElementById('countdown').value;
  var changeValue = document.getElementById('initialChange').checked;
  var epilepticValue = document.getElementById('epilepticEnable').checked;

  chrome.storage.sync.set({
    countdown: timeValue,
    initialChange: changeValue,
    epilepticEnable: epilepticValue
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Settings saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    countdown: 16,
    initialChange: true,
    epilepticEnable: true
  }, function(items) {
    document.getElementById('countdown').value = items.countdown;
    document.getElementById('initialChange').checked = items.initialChange;
    document.getElementById('epilepticEnable').checked = items.epilepticEnable;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
