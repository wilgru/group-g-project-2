// Connect to HTML
const mainContentDiv = document.getElementById('main-content-section');
const mapDiv = document.getElementById('map');
const streetAddress = document.getElementById('street_address').textContent.replace('Address: ', '');
const cityAddress = document.getElementById('city_address').textContent.replace('City: ', '');


// Declare Global Variables ---------------------------------
const googleMapsAPIKey = "AIzaSyBZSbspfBXqcmanZk33s7O_cjZnyS3X2r4";
const googleGeocodingAPIKey = "AIzaSyA3xEm83IcSrmNBMoTLR5PQHJ1WZ9Jr6kY";
let map;
// Object has .lat, .long , .address and .touristAttractionsSearchURL variables
const cityGoogleObject = {};
const defaultCityName = 'Sydney';
const defaultCityCoords = { lat: -33.8688, lng: 151.2093 }; // Alice Springs
let cityCoords = {};
let searchCity = streetAddress + ' ' + cityAddress;


// Tim ------------------------------------------------------------

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

}

function cityGoogleInfo() {
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    const latLongAPIRequest = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity}&key=${googleGeocodingAPIKey}`;

    return fetch(latLongAPIRequest)
        .then((response) => response.json())
        .then((data) => {
            // This is where the data response is-- - console.log(data)
            cityGoogleObject.lat = data.results[0].geometry.location.lat;
            cityGoogleObject.long = data.results[0].geometry.location.lng;
            cityGoogleObject.address = data.results[0].formatted_address;
            cityCoords.lat = cityGoogleObject.lat;
            cityCoords.lng = cityGoogleObject.long;

            console.log(typeof (cityCoords));
            console.log(defaultCityCoords);
        });
}

async function init() {

    await cityGoogleInfo();
    window.initMap = initMap;
    // Setup Google maps section
    // Create the script tag, set the appropriate attributes for Initial Google Map. initMap function called.
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsAPIKey}&callback=initMap`;
    script.async = true;
    document.head.appendChild(script);

}

init();
