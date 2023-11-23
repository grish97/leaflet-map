import { kml } from "@tmcw/togeojson";

export const getGeoJSON = async () => {
  const response = await fetch("/info.kml");
  const data = await response.text();

  const xml = parseToXML(data);

  return toGeoJSON(xml);
};

export const parseToXML = (kml: string) => {
  const domParser = new DOMParser();

  return domParser.parseFromString(kml, "text/xml");
}

export const toGeoJSON = (xml: Document) => {
  return kml(xml);
};