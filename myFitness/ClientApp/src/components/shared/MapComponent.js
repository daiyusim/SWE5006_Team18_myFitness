import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import 'leaflet-tilejson';
import $ from 'jquery';

const MapComponent = ({ lat, long, address }) => {
    useEffect(() => {
        // Define the bounds of Singapore
        let bounds = L.latLngBounds([1.15, 103.6], [1.48, 104.05]);
        let map;

        $.get("https://www.onemap.gov.sg/maps/json/raster/tilejson/2.2.0/Default.json", function (data, status) {
            map = L.TileJSON.createMap('mapdiv', data);
            map.setMaxBounds(bounds); // Set maximum bounds to restrict the view within Singapore

            // Set view to the approximate center of Singapore
            map.setView([1.3521, 103.8198], 12);

            // Add marker without icon
            const marker = L.marker([lat, long], { icon: L.divIcon({ className: 'custom-div-icon', html: '' }) }).addTo(map);
            marker.bindPopup(`<b>${address}</b><br>`).openPopup();

            // Move the map view closer to the marker
            map.setView(marker.getLatLng(), map.getMaxZoom());
        });

        // Clean up function
        return () => {
            if (map) {
                map.remove();
            }
        };
    }, []);

    return <center><div id='mapdiv' style={{ height: '200px', width: '70vh' }}></div></center>;
};

export default MapComponent;
