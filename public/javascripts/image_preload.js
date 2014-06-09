$(document).ready(function() {
    $.preloadImages = function() {
    	  for (var i = 0; i < arguments.length; i++) {
    	    $("<img />").attr("src", arguments[i]);
    	  }
    	}

    $.preloadImages("/images/armadillo.png","/images/armadillo_logo_2.png", "/images/referee.png", "/images/brazil_folder.png", "/images/map.png", "/images/brazil_help_contact.png", "/images/Algeria_flag.png","/images/Cameroon_flag.png","/images/Ivory Coast_flag.png","/images/Ghana_flag.png","/images/Nigeria_flag.png","/images/Australia_flag.png","/images/Iran_flag.png","/images/Japan_flag.png","/images/South Korea_flag.png","/images/Belgium_flag.png","/images/Bosnia and Herzegovina_flag.png","/images/Croatia_flag.png","/images/England_flag.png","/images/France_flag.png","/images/Germany_flag.png","/images/Greece_flag.png","/images/Italy_flag.png","/images/Netherlands_flag.png","/images/Portugal_flag.png","/images/Russia_flag.png","/images/Spain_flag.png","/images/Switzerland_flag.png","/images/Costa Rica_flag.png","/images/Honduras_flag.png","/images/Mexico_flag.png","/images/United States_flag.png");
    
});



