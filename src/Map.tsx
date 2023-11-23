import {FC, useCallback, useEffect, useState} from "react";
import {MapContainer, ImageOverlay, Marker, Popup, GeoJSON} from "react-leaflet";
import {CRS, LatLngBounds, geoJson as _geoJSON} from "leaflet";

import { getGeoJSON } from "./helpers";

export const Map: FC = () => {
  const [geoJson, setGeoJSON] = useState<any>(null);
  const [bounds, setBounds] = useState<any>(null);

  const loadData = useCallback(async () => {
    const data = await getGeoJSON();

    const bounds = _geoJSON(data);

    setBounds(bounds.getBounds());
    setGeoJSON(data);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  console.log(bounds)

  return (
    <MapContainer
      style={{height: "500px", width: "600px", border: "1px solid gray"}}
      zoom={8}
      crs={CRS.Simple}
      center={[40.184531, 44.623633]}
      scrollWheelZoom={false}
    >
      {geoJson && (
        <>
          TileLayer
          <ImageOverlay
            url="/image-overlay.png"
            bounds={bounds}
          >
            <GeoJSON data={geoJson} style={{ color: "green" }} />
          </ImageOverlay>
        </>
      )}
    </MapContainer>
  );
};