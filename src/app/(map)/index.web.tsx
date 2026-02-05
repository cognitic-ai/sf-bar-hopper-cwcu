import { useEffect, useRef } from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import * as AC from "@bacons/apple-colors";
import { sfBars } from "@/data/bars";
import { useRoute } from "@/context/route-context";

L.Icon.Default.mergeOptions({
  imagePath: window.location.origin,
  iconUrl: require("leaflet/dist/images/marker-icon.png").uri,
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").uri,
  shadowUrl: require("leaflet/dist/images/marker-shadow.png").uri,
});

export default function MapScreen() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const router = useRouter();
  const { isInRoute } = useRoute();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([37.7749, -122.4194], 13);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    sfBars.forEach((bar) => {
      const inRoute = isInRoute(bar.id);
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: 32px;
          height: 32px;
          background: ${inRoute ? "#34C759" : "#007AFF"};
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const marker = L.marker([bar.coordinates.latitude, bar.coordinates.longitude], { icon }).addTo(
        map
      );

      marker.bindPopup(`
        <div style="min-width: 180px; font-family: -apple-system, system-ui, sans-serif;">
          <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">${bar.name}</h3>
          <p style="margin: 0; font-size: 13px; color: #666;">${bar.neighborhood} · ${bar.vibe}</p>
          <p style="margin: 8px 0 0 0; font-size: 13px; color: #007AFF; cursor: pointer;"
             onclick="window.dispatchEvent(new CustomEvent('navigate-bar', { detail: '${bar.id}' }))">
            View details →
          </p>
        </div>
      `);
    });

    const handleNavigate = (e: CustomEvent) => {
      router.push(`/bar/${e.detail}`);
    };

    window.addEventListener("navigate-bar", handleNavigate as EventListener);

    return () => {
      window.removeEventListener("navigate-bar", handleNavigate as EventListener);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 100,
          left: 16,
          right: 16,
          backgroundColor: AC.secondarySystemBackground as unknown as string,
          borderRadius: 12,
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#007AFF",
          }}
        />
        <Text style={{ fontSize: 13, color: AC.label as unknown as string }}>Available</Text>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            backgroundColor: "#34C759",
            marginLeft: 8,
          }}
        />
        <Text style={{ fontSize: 13, color: AC.label as unknown as string }}>In your route</Text>
      </View>
    </View>
  );
}
