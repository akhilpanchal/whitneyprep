"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import pointsOfInterest from "./pointsOfInterest";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Toggle options here
const USE_SYMBOL_LAYER = true;

export default function MountainScene() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: [-122.28253982937008, 37.65859166951162],
      zoom: 8.80,
      pitch: 0.00,
      bearing: -30.42,
      antialias: true,
    });

    map.current.on("load", () => {
      // Add terrain
      map.current?.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 14,
      });

      map.current?.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      map.current?.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 0.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });


      // Symbol layer with text labels
      if (USE_SYMBOL_LAYER) {
        map.current?.addSource("custom-pois", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: pointsOfInterest.map((point) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: point.coords,
              },
              properties: {
                title: point.name,
                description: point.description,
              },
            })),
          },
        });

        map.current?.addLayer({
          id: "poi-labels",
          type: "symbol",
          source: "custom-pois",
          layout: {
            "text-field": ["get", "title"],
            "text-font": ["Open Sans Bold", "Arial Unicode MS Bold"],
            "text-offset": [0, 1.5],
            "text-anchor": "top",
          },
          paint: {
            "text-color": "#FF5733",
            "text-halo-color": "#ffffff",
            "text-halo-width": 1.5,
          },
        });

        map.current?.on("click", (e) => {
          console.log("Clicked coords:", e.lngLat);
        });
      }

      map.current?.flyTo({
        center: [-118.25228375856008, 36.58560209588509], // Ideal Start View
        zoom: 13.75,
        pitch: 76.00,
        bearing: -110.80,
        speed: 0.8,        // Make it smooth
        curve: 1.5,        // Flight path curvature
        easing: (t) => t,  // Linear easing
      });

      map.current?.on("moveend", () => {
        const center = map.current!.getCenter();
        const zoom = map.current!.getZoom();
        const pitch = map.current!.getPitch();
        const bearing = map.current!.getBearing();

        console.log("📍 Camera View:");
        console.log("center:", [center.lng, center.lat]);
        console.log("zoom:", zoom.toFixed(2));
        console.log("pitch:", pitch.toFixed(2));
        console.log("bearing:", bearing.toFixed(2));
      });

    });
  }, []);

  return <div ref={mapContainer} className="w-full h-screen border-2 border-gray-800 overflow-hidden" />;
}
