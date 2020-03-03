//  This is based on code written by Attila Albert and found here: https://colorlib.com/wp/bootstrap-sidebar/


// arrays to hold copies of the markers and html used by the side_bar
// because the function closure trick doesnt work there
var gmarkers = [];
var map = null;

function initialize() {
	var myWrapper = $("#wrapper");
	$("#menu-toggle").click(function(e) {
		e.preventDefault();
		$("#wrapper").toggleClass("toggled");
		myWrapper.one(
			"webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
			function(e) {
				// code to execute after transition ends
				google.maps.event.trigger(map, "resize");
			}
		);
	});
	// create the map
	var myOptions = {
		zoom: 14,
		center: new google.maps.LatLng(42.0490, -87.6844),
		mapTypeControl: true,
		mapTypeControlOptions: {
			style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
		},
		navigationControl: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	google.maps.event.addListener(map, "click", function() {
		infowindow.close();
	});

	// Add markers to the map
	// Set up three markers with info windows
	// add the points
	var point = new google.maps.LatLng(42.0394, -87.6806);
	var marker = createMarker(
		point,
		"$10<br>Out of Network<br>Jewel-Osco Pharmacy",
		"$10<br> Out of Network<br> Jewel-Osco Pharmacy <br> 1711 Sherman Ave, Evanston, IL 60201<br>(847) 328-3105"
	);

	var point = new google.maps.LatLng(42.052215, -87.678939);
	var marker = createMarker(
		point,
		"$15 <br> In Network <br> Northwestern Searle Health Center",
		"$15 <br> In Network <br> Northwestern Searle Health Center <br>633 Emerson St.<br>(847) 491-2119"
	);

	var point = new google.maps.LatLng(42.0490, -87.6815);
	var marker = createMarker(
		point,
		"$10 <br> Out of Network <br> CVS Pharmacy",
		"$10 <br> Out of Network <br> CVS Pharmacy <br> 1711 Sherman Ave, Evanston, IL 60201 <br> (847) 328-3105"
	);

}

var infowindow = new google.maps.InfoWindow({
	size: new google.maps.Size(150, 50)
});

// This function picks up the click and opens the corresponding info window
function myclick(i) {
	google.maps.event.trigger(gmarkers[i], "click");
}

// A function to create the marker and set up the event window function
function createMarker(latlng, name, html) {
	var contentString = html;
	var marker = new google.maps.Marker({
		position: latlng,
		map: map,
		zIndex: Math.round(latlng.lat() * -100000) << 5
	});

	google.maps.event.addListener(marker, "click", function() {
		infowindow.setContent(contentString);
		infowindow.open(map, marker);
	});
	// save the info we need to use later for the side_bar
	gmarkers.push(marker);
	// add a line to the side_bar html
	var sidebar = $("#side_bar");
	var sidebar_entry = $("<li/>", {
		html: name,
		click: function() {
			google.maps.event.trigger(marker, "click");
		},
		mouseenter: function() {
			$(this).css("color", "rgb(45, 100, 245)"); // change sidebar text to blue when you hover
			$(this).css("font-weight", "bold"); // change sidebar text to bold when you hover

		},
		mouseleave: function() {
			$(this).css("color", "#000");
			$(this).css("font-weight", "normal"); // change sidebar text back to normal
		}
	}).appendTo(sidebar);
}

function goToNewPage()
    {
        var url = document.getElementById('list').value;
        if(url != 'none') {
            window.location = url;
        }
    }

google.maps.event.addDomListener(window, "load", initialize);
