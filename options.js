function saveOptions() {
  var timeValue = document.getElementById('countdown').value;
  chrome.storage.sync.set({
    countdown: timeValue
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Countdown time saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    countdown: 11,
  }, function(items) {
    document.getElementById('countdown').value = items.countdown;
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
