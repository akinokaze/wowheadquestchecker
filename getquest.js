var char = '';
var region='';
var server = '';

function include(arr, obj) {
    for (var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
}

function createRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, false);
  xhr.send();
  return xhr;
}

chrome.storage.sync.get({
  char: '',
  region: '',    
  server: ''
  }, function(items) {
    
var char = items.char;
var region = items.region;    
var server = items.server; 
var url = "http://"+region+".battle.net/api/wow/character/"+server+"/"+char+"?fields=quests";
var xhr = createRequest('GET', url);
if (!xhr) {
  throw new Error('Request failed somehow.');
}

var re = /([0-9])\w+/;
questarray = re.exec(document.URL);
var output = JSON.parse(xhr.responseText);
result = include(output.quests, questarray[0]);

var div = document.getElementById('infobox-contents0');
if(result==true){
div.insertAdjacentHTML('afterBegin', "<div style='color:#00FF00'>"+char+" of " +server+ " has completed this quest.</div>");}
else {
div.insertAdjacentHTML('afterBegin', "<div style='color:#FF0000'>"+char+" of " +server+ " has NOT completed this quest.</div>");}    
     
});