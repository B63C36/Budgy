"use client";

import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';
import { useMemo } from 'react';
import "../styling/map.css";
import Sidebar from '../tools/sidebar';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 53.350140,
  lng: -6.266155,
};

const locations = [
  { lat: 53.350140, lng: -6.266155 },
  { lat: 53.3501, lng: -6.266155 },
  { lat: 53.350, lng: -6.266 },
];

export default function MapPage() {
  const heatMapData = useMemo(() => {
    if (typeof window !== 'undefined' && window.google) {
      return locations.map(loc => new window.google.maps.LatLng(loc.lat, loc.lng));
    }
    return [];
  }, []);

  return (
    <div className="page-container">
      <Sidebar />
      <div className="map-area">
        <LoadScript googleMapsApiKey="AIzaSyBhGV2IOTX-VyJPGSP9cJl5VOsWq91ifF0&"
          libraries={['visualization']}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
          >
            {heatMapData.length > 0 && <HeatmapLayer data={heatMapData} />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}
