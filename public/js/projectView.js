// Connect to HTML
const domainSection = document.getElementById("domain-section");
const mapDiv = document.getElementById("map");
const streetAddress = document.getElementById("street_address").textContent.replace("Address: ", "");
const cityAddress = document.getElementById("city_address").textContent.replace("City: ", "");

// Declare Global Variables ---------------------------------
const googleMapsAPIKey = "AIzaSyBZSbspfBXqcmanZk33s7O_cjZnyS3X2r4";
const googleGeocodingAPIKey = "AIzaSyA3xEm83IcSrmNBMoTLR5PQHJ1WZ9Jr6kY";
const domainAPIKey = "key_fe3c219649342187fcd7449017a171bc";
let map;
// Object has .lat, .long , .address variables
const cityGoogleObject = {};
const defaultCityName = "Sydney";
const domainObject = {};
const defaultCityCoords = { lat: -33.8688, lng: 151.2093 }; // Alice Springs
const cityCoords = {};
const searchCity = `${streetAddress} ${cityAddress}`;

// Google API ------------------------------------------------------------

function initMap() {
	// The location of thisCity
	const thisCity = cityCoords;
	// The map, centered at thisCity
	map = new google.maps.Map(mapDiv, {
		zoom: 16,
		center: thisCity,
	});
	// The marker, positioned at thisCity
	const marker = new google.maps.Marker({
		position: thisCity,
		map,
	});

	// Let user get lat and long by double click on map
	map.addListener("dblclick", (mapsMouseEvent) => {
		// Create a new InfoWindow.
		infoWindow = new google.maps.InfoWindow({
			position: mapsMouseEvent.latLng,
		});
		infoWindow.setContent(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2));
		infoWindow.open(map);
	});
}

//Function to fetch API latitude and longitude
function cityGoogleInfo() {
	// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
	const latLongAPIRequest = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity}&key=${googleGeocodingAPIKey}`;

	return fetch(latLongAPIRequest)
		.then((response) => response.json())
		.then((data) => {
			cityGoogleObject.lat = data.results[0].geometry.location.lat;
			cityGoogleObject.long = data.results[0].geometry.location.lng;
			cityGoogleObject.address = data.results[0].formatted_address;
			cityCoords.lat = cityGoogleObject.lat;
			cityCoords.lng = cityGoogleObject.long;
		});
}

//Function to retrieve Domain API properties
async function init() {
	await cityGoogleInfo();
	await getDomainPropertyID();
	await getDomainLocationID();
	await getDomainSuburbInfo();
	await renderDomainSection();
	window.initMap = initMap;
	// Setup Google maps section
	// Create the script tag, set the appropriate attributes for Initial Google Map. initMap function called.
	const script = document.createElement("script");
	script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=initMap`;
	script.async = true;
	document.head.appendChild(script);
}

// Domain API   ----------------------------------------------------
function getDomainPropertyID() {
	const domainRequest = `https://api.domain.com.au/v1/properties/_suggest?terms=${searchCity}&pageSize=1&channel=residential&api_key=${domainAPIKey}`;

	return fetch(domainRequest)
		.then((response) => response.json())
		.then((data) => {
			domainObject.propertyID = data[0].id;
			domainObject.addressComponents = data[0].addressComponents;
		});
}

//Function to retrieve Domain API locations
function getDomainLocationID() {
	const domainRequest = `https://api.domain.com.au/v1/addressLocators
?searchLevel=Address&streetNumber=${domainObject.addressComponents.streetNumber}&streetName=${domainObject.addressComponents.streetName}&streetType=${domainObject.addressComponents.streetType}&suburb=${domainObject.addressComponents.suburb}&state=${domainObject.addressComponents.state}&postcode=${domainObject.addressComponents.postCode}&api_key=${domainAPIKey}`;

	return fetch(domainRequest)
		.then((response) => response.json())
		.then((data) => {
			domainObject.ids = data[0].ids;
			domainObject.suburbID = domainObject.ids[2].id;
			console.log(domainObject);
		});
}

//Function to retrieve Domain API suburb information
function getDomainSuburbInfo() {
	const domainRequest = `https://api.domain.com.au/v2/suburbPerformanceStatistics/${domainObject.addressComponents.state}/${domainObject.addressComponents.suburb}/${domainObject.addressComponents.postCode}?api_key=${domainAPIKey}&chronologicalSpan=12&tPlusFrom=1&tPlusTo=3`;

	return fetch(domainRequest)
		.then((response) => response.json())
		.then((data) => {
			domainObject.suburb = data.header.suburb;
			domainObject.suburbInfo = data.series.seriesInfo[3].values;
			console.log(domainObject.suburbInfo);
		});
}

//Function to retrieve Domain API section
function renderDomainSection() {
	const header = document.createElement("h4");
	const text = document.createElement("p");
	header.textContent = `Project Feasibility Info for: ${domainObject.suburb}`;
	text.innerHTML = `Median House Price: ${formatDollars(domainObject.suburbInfo.medianSoldPrice)}<br>` + `Houses Sold (last quarter): ${domainObject.suburbInfo.numberSold}<br>` + `5th Percentile Price: ${formatDollars(domainObject.suburbInfo["5thPercentileSoldPrice"])}<br>` + `25th Percentile Price: ${formatDollars(domainObject.suburbInfo["25thPercentileSoldPrice"])}<br>` + `75th Percentile Price: ${formatDollars(domainObject.suburbInfo["75thPercentileSoldPrice"])}<br>` + `95th Percentile Price: ${formatDollars(domainObject.suburbInfo["95thPercentileSoldPrice"])}<br>`;
	text.setAttribute("style", "padding-left: 10px;");

	domainSection.appendChild(header);
	domainSection.appendChild(text);
}

// -------------------------------------------------------

// format currency
const formatDollars = (value) => {
	const formatter = Intl.NumberFormat("en-US", { style: "currency", currency: "AUD" });

	return formatter.format(value).replace("A$", "$");
};

init();
