$(document).ready(function() {
    $.preloadImages = function() {
    	  for (var i = 0; i < arguments.length; i++) {
    	    $("<img />").attr("src", arguments[i]);
    	  }
    	}

    $.preloadImages("/images/bostonia.png","/images/map.png","/images/Algeria_flag.png","/images/Argentina_flag.png","/images/uk_flag.png","/images/Brazil_flag.png","/images/Ecuador_flag.png","/images/Cameroon_flag.png","/images/Chile_flag.png","/images/Colombia_flag.png","/images/Ivory Coast_flag.png","/images/Ghana_flag.png","/images/Nigeria_flag.png","/images/Australia_flag.png","/images/Iran_flag.png","/images/Japan_flag.png","/images/South Korea_flag.png","/images/Belgium_flag.png","/images/Bosnia and Herzegovina_flag.png","/images/Croatia_flag.png","/images/Uruguay_flag.png","/images/France_flag.png","/images/Germany_flag.png","/images/Greece_flag.png","/images/Italy_flag.png","/images/Netherlands_flag.png","/images/Portugal_flag.png","/images/Russia_flag.png","/images/Spain_flag.png","/images/Switzerland_flag.png","/images/Costa Rica_flag.png","/images/Honduras_flag.png","/images/Mexico_flag.png","/images/United States_flag.png");
    
});



