// Saves options to chrome.storage
function save_options() {
  var char1 = document.getElementById('char').value;
  var region1 = document.getElementById('region').value;    
  var server1 = document.getElementById('server').value;
  chrome.storage.sync.set({
    char: char1,
    region: region1,  
    server: server1
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    char: '',
    region: '',  
    server: ''
  }, function(items) {
    document.getElementById('char').value = items.char;
    document.getElementById('region').value = items.region;  
    document.getElementById('server').value = items.server;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);