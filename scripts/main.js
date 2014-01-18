

(function($) {

	//
	// TABLETOP
	//

	// Assign Google spreadsheet URL to variable  
	var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AmqQKSPoegtOdHVOV2hrbGs5V0wwWlh2Tm9QbmVnUUE&output=html';

	// Initialize Tabletop with whatever options you want
	Tabletop.init( { key: public_spreadsheet_url,
		callback: showInfo,
		simpleSheet: true		
	});

	function showInfo(data, tabletop) {
	    alert("Successfully processed!")
	    console.log(data);
	  }


	//
	// HANDLEBARS
	//

	function showInfo(data, tabletop) {
		var source = $("#handlebars-template").html();
		var template = Handlebars.compile(source);
		
		// Create a templated item for every row in the spreadsheet
		$.each( tabletop.sheets("Sheet1").all(), function(i, cat) {
			var html = template(cat);
			$(".quiz-mod").append(html);
		});
	};

	$(".quiz-mod").on('click', ".option", function() {
		var $this = $(this),
			questionMod = $this.parents(".question-mod"),
			responses = questionMod.find(".option"),
			agree = $this.data("agree"),
			results = questionMod.find(".results"),
			percent = results.find(".percentage");

		$this.addClass("option-on");
		percent.text(agree);
		results.addClass("results-on");
		responses.addClass("answered");
		responses.click(function(event) {
			event.stopPropagation();
		});
	})

}(jQuery));




