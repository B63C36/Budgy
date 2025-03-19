function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 53.350140, lng: -6.266155 },
        zoom: 10,
    });
}

// Make the function available globally for Google Maps API
window.initMap = initMap;
