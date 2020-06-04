// Load the latest news
function loadLatestNews(){
	let xmlhttp = new XMLHttpRequest();
	  xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    let result = JSON.parse(this.responseText);
		   
			// Build up our HTML
			  let html = '';

			  // Loop through the results
			  for (let i = 0; i < result.latestNews.length; i++) {

				let title = '<h2><a href="./article.htm?id=' + result.latestNews[i].id + '">' + result.latestNews[i].title + '</a></h2>';
				let description = '<p>' + result.latestNews[i].description + '</p>'

				html += title + description;
			  }

			  // Update the DOM with the data
			  document.getElementById('latest').innerHTML = html;
		}
	  };
	  xmlhttp.open('GET', './backend/latest.json', true);
	  xmlhttp.send();
}

loadLatestNews();


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

