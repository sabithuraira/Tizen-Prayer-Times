(function() {
	/**
	 * Back key event handler
	 */
	window.addEventListener('tizenhwkey', function(ev) {
		if (ev.keyName === "back") {
			var activePopup = document.querySelector('.ui-popup-active'),
				page = document.getElementsByClassName('ui-page-active')[0],
				pageid = page ? page.id : "";

			if (pageid === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
	
	var options = {enableHighAccuracy: true, maximumAge: 600000, timeout: 10000};

	function successCallback(position)
	{
		var timeStamp = Math.floor(Date.now() / 1000);
		var latitude= position.coords.latitude;
		var longitude = position.coords.longitude;
		
		var url="http://api.aladhan.com/timings/"+timeStamp+"?latitude="+latitude+"&longitude="+longitude+"&method=4";
		
		$.getJSON(url, function (result)
		 {
			if(result.code==200){
				$("#salat-title").html("For date: "+result.data.date.readable);

				$("#time-fajr").html(result.data.timings.Fajr);
				$("#time-dhuhr").html(result.data.timings.Dhuhr);
				$("#time-asr").html(result.data.timings.Asr);
				$("#time-maghrib").html(result.data.timings.Maghrib);
				$("#time-isha").html(result.data.timings.Isha);

				$("#time-sunset").html(result.data.timings.Sunset);
				$("#time-sunrise").html(result.data.timings.Sunrise);
			}
			else{
				$("#salat-title").html("Error, check your internet connection");

				$("#time-fajr").html("?");
				$("#time-dhuhr").html("?");
				$("#time-asr").html("?");
				$("#time-maghrib").html("?");
				$("#time-isha").html("?");

				$("#time-sunset").html("?");
				$("#time-sunrise").html("?");
			}
		 });
	}

	function errorCallback(error)
	{
		console.log(error);
		var err_message="";
	    switch (error.code) {
	        case error.PERMISSION_DENIED:
	            err_message = 'User denied Geolocation.';
	            break;
	        case error.POSITION_UNAVAILABLE:
	            err_message = 'Location information is unavailable.';
	            break;
	        case error.TIMEOUT:
	            err_message = 'The request to get location timed out.';
	            break;
	        case error.UNKNOWN_ERROR:
	            err_message = 'An unknown error occurred.';
	            break;
	    }
	    
		$("#salat-title").html(err_message);

		$("#time-fajr").html("?");
		$("#time-dhuhr").html("?");
		$("#time-asr").html("?");
		$("#time-maghrib").html("?");
		$("#time-isha").html("?");
		
		$("#time-sunset").html("?");
		$("#time-sunrise").html("?");
	}
	
	function getApi(){
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);	

		$("#salat-title").html("Please wait..");

		$("#time-fajr").html("...");
		$("#time-dhuhr").html("...");
		$("#time-asr").html("...");
		$("#time-maghrib").html("...");
		$("#time-isha").html("...");
	}
	
	window.addEventListener('load', getApi);
	
	document.getElementById("back-btn").addEventListener("click", getApi);
}());
