chrome.runtime.onMessage.addListener(function(request, sender) {
	console.log(request.redirect);
    //chrome.tabs.update(sender.tab.id, {url: request.redirect});
});

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({
		active:true,
		currentWindow: true
	}, function(tabs) {
		var tab = tabs[0];
		var url = tab.url;
		console.log(url);
		console.log(tab.id);
			
		var xhttp = new XMLHttpRequest();
		var archiveUrl = "http://archive.org/wayback/available?url="+url
		xhttp.onreadystatechange = function(){
			
			if(xhttp.readyState == 4 && xhttp.status == 200){
				data = JSON.parse(xhttp.response);
				var redirectUrl = data.archived_snapshots.closest.url;
				console.log(redirectUrl)
				chrome.browserAction.setIcon({path:"iconpressed.png"});
				chrome.tabs.update(tab.id, {url:redirectUrl});

			}	
			
		}
		
		
		xhttp.open("GET",archiveUrl,true)
		xhttp.send();
		
		
	});
	

		
	//chrome.tabs.update(tab.id,{url: "www.google.com"});
});