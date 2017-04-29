$(document).ready(function() {


	chrome.tabs.query({active:true, currentWindow: true}, function(arrayOfTabs) {
		var activeTab = arrayOfTabs[0];
		var activeTabId = activeTab.id;
		var activeTabUrl = activeTab.url;
		
		console.log(activeTab);
		$("#url").html(activeTabUrl);
		
		var xhttp = new XMLHttpRequest();
		var url = "http://archive.org/wayback/available?url="+activeTabUrl
		xhttp.onreadystatechange = function(){
			
				if(xhttp.readyState == 4 && xhttp.status == 200){
				data = JSON.parse(xhttp.response);
				console.log(data);
				var redirectUrl = data.archived_snapshots.closest.url;
				console.log(redirectUrl)
				chrome.runtime.sendMessage({redirect: redirectUrl});

			}
			
		}
		
		
		xhttp.open("GET",url,true)
		xhttp.send();
		
	});
});