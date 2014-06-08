$(document).ready(function() {

	$("ul.nav li").each(function() {
		$(this).click(function() {
			$(this).toggleClass("active");
		});
	});

	if ($('div.alert').length > 0) {
		$(this).scrollTop($('div.alert').position().top + 340);
	}

    // preventing event bubbling (hack to introduce bootstrap 3 for now)

    $('.predictBtn').click( function(){




        // flag counter for the two input fields
        var x=0;

        var matchForm = $(this).parent();

        matchForm.parent().parent().parent().find('.input-lg').each(function(){
            var score = $(this).val();
            if (score == '' || score < 0 || score == null || isNaN(score)){
                alert('Watch your input!');
                //$(this).addClass('invalidInput');
                return false;
            }
            else{         
                 x++;
            }

            //if both inputs for both teams are valid, kor!
             if (x==2)
               matchForm.submit();
        });

    return false;
    });



    $.preloadImages = function() {
    	  for (var i = 0; i < arguments.length; i++) {
    	    $("<img />").attr("src", arguments[i]);
    	  }
    	}

    $.preloadImages("/images/neymar.png", "/images/james.png", "/images/armadillo_logo_2.png", "/images/referee.png", "/images/brazil_folder.png", "/images/map.png", "/images/brazil_help_contact.png", "/images/Algeria_flag.png","/images/Cameroon_flag.png","/images/Ivory Coast_flag.png","/images/Ghana_flag.png","/images/Nigeria_flag.png","/images/Australia_flag.png","/images/Iran_flag.png","/images/Japan_flag.png","/images/South Korea_flag.png","/images/Belgium_flag.png","/images/Bosnia and Herzegovina_flag.png","/images/Croatia_flag.png","/images/England_flag.png","/images/France_flag.png","/images/Germany_flag.png","/images/Greece_flag.png","/images/Italy_flag.png","/images/Netherlands_flag.png","/images/Portugal_flag.png","/images/Russia_flag.png","/images/Spain_flag.png","/images/Switzerland_flag.png","/images/Costa Rica_flag.png","/images/Honduras_flag.png","/images/Mexico_flag.png","/images/United States_flag.png");

});



