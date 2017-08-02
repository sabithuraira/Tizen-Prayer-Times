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
		console.log(position);
		var timeStamp = Math.floor(Date.now() / 1000);
		var latitude= position.coords.latitude;
		var longitude = position.coords.longitude;
		
		var url="http://api.aladhan.com/timings/"+timeStamp+"?latitude="+latitude+"&longitude="+longitude+"&method=4";
		
		$.getJSON(url, function (result)
		 {
			console.log(result);
			if(result.code==200){
				$("#salat-title").html("For date: "+result.data.date.readable);

				$("#time-fajr").html(result.data.timings.Fajr);
				$("#time-dhuhr").html(result.data.timings.Dhuhr);
				$("#time-asr").html(result.data.timings.Asr);
				$("#time-maghrib").html(result.data.timings.Maghrib);
				$("#time-isha").html(result.data.timings.Isha);
			}
			else{
				$("#salat-title").html("Error, check your internet connection");

				$("#time-fajr").html("?");
				$("#time-dhuhr").html("?");
				$("#time-asr").html("?");
				$("#time-maghrib").html("?");
				$("#time-isha").html("?");
			}
		 });
	}

	function errorCallback(error)
	{
//		console.log(error);
		$("#salat-title").html("Error, activate you GPS Location");

		$("#time-fajr").html("?");
		$("#time-dhuhr").html("?");
		$("#time-asr").html("?");
		$("#time-maghrib").html("?");
		$("#time-isha").html("?");
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
}());
