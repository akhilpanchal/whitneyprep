"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as THREE from "three";
import GPXParser from "gpxparser";
import ClientPolyfills from "../_client-polyfills";

const Orbit = dynamic(() => import("@react-three/drei").then((mod) => mod.OrbitControls), {
  ssr: false,
});

export default function MountainScene() {
  const [points, setPoints] = useState<THREE.Vector3[]>([]);
  const [center, setCenter] = useState<THREE.Vector3 | null>(null);

  useEffect(() => {
    async function loadGPX() {
      const res = await fetch("/mount-whitney.gpx");
      const text = await res.text();
      const parser = new GPXParser();
      parser.parse(text);

      const trackPoints = parser.tracks[0]?.points || [];
      if (trackPoints.length === 0) {
        console.warn("No track points found.");
        return;
      }

      const origin = trackPoints[0];

      const coords = trackPoints.map((pt) => {
        const x = (pt.lon - origin.lon) * 100000;
        const z = (pt.lat - origin.lat) * 100000;
        const y = pt.ele; // keep elevation in meters
        return new THREE.Vector3(x, y, z);
      });

      const box = new THREE.Box3().setFromPoints(coords);
      setCenter(box.getCenter(new THREE.Vector3()));
      setPoints(coords);
    }

    loadGPX();
  }, []);

  return (
    <ClientPolyfills>
    <div className="w-400 h-200 border-1 border-gray-900">
      <Canvas camera={{ position: [0, 500, 1000], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7]} intensity={1} />
        <Orbit />
        <Grid
          position={[0, 0, 0]}
          args={[2000, 2000]}
          sectionColor="#333"
          sectionThickness={1.5}
        />
        {points.length > 0 && (
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap((v) => [v.x, v.y, v.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="red" linewidth={2} />
          </line>
        )}
      </Canvas>
    </div>
    </ClientPolyfills>
  );
}
