import {FC, useCallback, useEffect, useState} from "react";
import {MapContainer, ImageOverlay, Marker, Popup, GeoJSON} from "react-leaflet";
import {CRS, LatLngBounds} from "leaflet";

import { getGeoJSON } from "./helpers";

export const Map: FC = () => {
  const [geoJson, setGeoJSON] = useState<any>(null);

  const loadData = useCallback(async () => {
    const geoJSON = await getGeoJSON();

    setGeoJSON(geoJSON);
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <MapContainer
      style={{height: "500px", width: "600px", border: "1px solid gray"}}
      zoom={8}
      crs={CRS.Simple}
      center={[40.184531, 44.623633]}
      scrollWheelZoom={false}
    >
      {geoJson && (
        <GeoJSON data={geoJson} style={{ color: "green" }} />
      )}
    </MapContainer>
  );
};