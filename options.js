function saveOptions() {
  var timeValue = document.getElementById('countdown').value;
  var changeValue = document.getElementById('initialChange').checked;
  chrome.storage.sync.set({
    countdown: timeValue,
    initialChange: changeValue
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
    countdown: 11,
    initialChange: true,
  }, function(items) {
    document.getElementById('countdown').value = items.countdown;
    document.getElementById('initialChange').checked = items.initialChange;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
