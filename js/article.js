// Get a value from the querystring
function findGetParameter(parameterName) {
    let result = null,
        tmp = [];
    let items = location.search.substr(1).split("&");
    for (let index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

// Load the article contents into the page
function loadArticle(){
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    let result = JSON.parse(this.responseText);
		    document.getElementById('article').innerHTML = result.description;
	  		document.getElementById('article-title').innerHTML = result.title;
		}
	};
	xmlhttp.open('GET', './backend/data-' + findGetParameter('id') + '.json', true);
	xmlhttp.send();
}

loadArticle();


// times2
var offlineNotification = document.getElementById('offline');
// Show an offline notification if the user if offline
function showIndicator() {
  offlineNotification.innerHTML = 'You are currently offline.';
  offlineNotification.className = 'showOfflineNotification';
}
// Hide the offline notification when the user comes back online
function hideIndicator() {
  offlineNotification.className = 'hideOfflineNotification';
}
// Update the online status icon based on connectivity at loading
if (window.navigator.onLine) hideIndicator();
else showIndicator();
// Update the online status icon based on connectivity changes
window.addEventListener('online',  hideIndicator);
window.addEventListener('offline', showIndicator);


