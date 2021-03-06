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

	// var point = new google.maps.LatLng();
	// var marker = createMarker(
	// "<br> <br><br>"
	// );
	var point = new google.maps.LatLng(42.048152, -87.684209);
	var marker = createMarker(
		point,
		"<br><br><br>Dr. Steven Beckway, DO",
		"Dr. Steven Beckway, DO -- In Network<br>Family Practice Physician<br>909 Davis St., Suite 200<br>(847) 866-3700"
	);

	var point = new google.maps.LatLng(42.052215, -87.678939);
	var marker = createMarker(
		point,
		"<br>Dr. Ng Hyman, MD",
		"Dr. Ng Hyman MD -- In Network<br>General Practitioner<br>633 Emerson St.<br>(847) 491-2119"
	);

	var point = new google.maps.LatLng(42.065490, -87.684210);
	var marker = createMarker(
		point,
		"<br>Dr. Jamie Titen, DO",
		"Dr. Jamie Titen, DO -- Out of Network<br>Family Practice Physician<br>2650 Ridge Ave., Suite 4210<br>(847) 570-1010"
	);

	var point = new google.maps.LatLng(42.049122, -87.685097);
	var marker = createMarker(
		point,
		"<br>Dr. Susan L. Alt, MD",
		"Dr. Susan L. Alt, MD -- Out of Network<br>Family Practice Physician<br>1704 Maple Ave, Suite 200<br>(847) 535-7157"
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
			$(this).css("color", "rgb(0, 114, 178)"); // change sidebar text to blue when you hover
			$(this).css("font-weight", "bold"); // change sidebar text to bold when you hover
			infowindow.setContent(contentString);
			$(this).css(infowindow.open(map, marker));
		},
		mouseleave: function() {
			$(this).css("color", "#000");
			$(this).css("font-weight", "normal"); // change sidebar text back to normal
			$(this).css(infowindow.close(map, marker));
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
