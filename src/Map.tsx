import {FC, useCallback, useEffect, useState} from "react";
import {MapContainer, ImageOverlay, Marker, Popup} from "react-leaflet";
import {CRS, LatLngBounds} from "leaflet";

import geoData from "./static.json";

export const Map: FC = () => {
  const [bounds, setBounds] = useState<number[][]>([]);

  const loadData = useCallback(() => {
    const bounds: number[][] = [];

    for (const item of geoData.data) {
      bounds.push([
        item.latitude,
        item.longitude,
      ])
    }

    setBounds(bounds);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <MapContainer
      style={{height: "500px", width: "600px"}}
      zoom={10}
      crs={CRS.Simple}
      center={[40.184531, 44.623633]}
    >
      {bounds && (
        <ImageOverlay
          url="https://www.viatransilvanica.com/assets/images/routes/acasa/hero-section.webp"
          bounds={new LatLngBounds(bounds)}
        >
          <Marker position={[40.18759286174862, 44.51475598652018]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </ImageOverlay>
      )}
    </MapContainer>
  );
};