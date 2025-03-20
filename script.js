let map; // Global map variable
let service; // Global PlacesService variable

function initMap() {
    // Properly assign the map globally
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.350140, lng: -6.266155 },
        zoom: 10,
    });

    // Initialize Places Service
    service = new google.maps.places.PlacesService(map);
}

// Ensure findPlace is globally accessible
window.findPlace = function () {
    if (!map || !service) {
        alert("Map is not loaded yet! Please wait.");
        return;
    }

    const input = document.getElementById("place-input").value;
    
    if (!input) {
        alert("Please enter a location.");
        return;
    }

    const request = {
        query: input,
        fields: ["name", "geometry"],
    };

    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const place = results[0];

            if (!place.geometry || !place.geometry.location) {
                alert("No geometry data available for this location.");
                return;
            }

            map.setCenter(place.geometry.location);
            new google.maps.Marker({
                position: place.geometry.location,
                map: map,
            });
        } else {
            alert("Place not found!");
        }
    });
};

// Ensure Google Maps API calls initMap
window.initMap = initMap;
