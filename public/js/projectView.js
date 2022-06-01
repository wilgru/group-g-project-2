// Connect to HTML
const mainContentDiv = document.getElementById('main-content-section');
const mapDiv = document.getElementById('map-div');

// Declare Global Variables ---------------------------------
const googleMapsAPIKey = config.mapsKey;
const googleGeocodingAPIKey = config.geocodingKey;
let map;
// Object has .lat, .long , .address and .touristAttractionsSearchURL variables
const cityGoogleObject = {};
const defaultCityName = 'Sydney';
const defaultCityCoords = { lat: -33.8688, lng: 151.2093 }; // Alice Springs
let searchCity;

// Tim ------------------------------------------------------------
function googleAPI(searchCity) {
    // Get the latitude and longitude of the searchCity

    if (searchCity === '' || searchCity === undefined) {
        searchCity = defaultCityName;
    }

    codeAddress(searchCity);
    const GoogleObject = cityGoogleInfo(searchCity);
}

function initMap() {
    // The location of thisCity
    const thisCity = defaultCityCoords;
    // The map, centered at thisCity
    map = new google.maps.Map(mapDiv, {
        zoom: 4,
        center: thisCity,
    });
    // The marker, positioned at thisCity
    const marker = new google.maps.Marker({
        position: thisCity,
        map,
    });

    // Let user get lat and long by double click on map
    map.addListener('dblclick', (mapsMouseEvent) => {
        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2),
        );
        infoWindow.open(map);
    });

    // Setup default map then call display to set local storage map
    defaultDisplay();
}

function codeAddress(cityForGeocode) {
    const address = cityForGeocode;
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
        if (status == 'OK') {
            map.zoom = 12;
            map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
                map,
                position: results[0].geometry.location,

            });
            saveSearch(cityForGeocode);
        } else {
            popup('show', 'Alert', `Geocode was not successful for the following reason: ${status}`, 'Cancel');
        }
    });
}

function cityGoogleInfo() {
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    const latLongAPIRequest = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity}&key=${googleGeocodingAPIKey}`;

    fetch(latLongAPIRequest)
        .then((response) => response.json())
        .then((data) => {
            // This is where the data response is --- console.log(data)
            cityGoogleObject.lat = data.results[0].geometry.location.lat;
            cityGoogleObject.long = data.results[0].geometry.location.lng;
            cityGoogleObject.address = data.results[0].formatted_address;
            // https://www.google.com/search?q=places+to+visit+sydney&oq=places+to+visit+sydney&aqs=chrome.0.0i512l5j0i22i30l5.4916j0j7&sourceid=chrome&ie=UTF-8
            cityGoogleObject.touristAttractionsSearchURL = `https://www.google.com/search?q=places+to+visit+sydney&oq=places+to+visit+${searchCity}&aqs=chrome.0.0i512l5j0i22i30l5.4916j0j7&sourceid=chrome&ie=UTF-8`;
            console.log(cityGoogleObject.touristAttractionsSearchURL);
        });
}

function init() {
    // Setup Google maps section
    // Create the script tag, set the appropriate attributes for Initial Google Map. initMap function called.
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);
}

init();
