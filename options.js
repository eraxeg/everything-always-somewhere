// Saves options to chrome.storage.sync.
function save_options() {
  var timeValue = document.getElementById('countdown').value;
  chrome.storage.sync.set({
    countdown: timeValue
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Countdown time saved.';
    console.log("saving");
    setTimeout(function() {
      status.textContent = '';
    }, 2000);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value timeValue = 'red' and likesColor = true.
  chrome.storage.sync.get({
    countdown: 6,
  }, function(items) {
    document.getElementById('countdown').value = items.countdown;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
