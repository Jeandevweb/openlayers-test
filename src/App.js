import React, { useState } from "react";
import {NavLink, useSearchParams} from "react-router-dom";
import Map from "./components/Map";
import { Layers, TileLayer, VectorLayer } from "./components/Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./components/Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./components/Controls";
import FeatureStyles from "./components/Features/Styles";

import mapConfig from "./config.json";
import "./App.css";

const geojsonObject = mapConfig.geojsonObject;
const markersLonLat = [mapConfig.montpellierLonLat];

function addMarkers(lonLatArray) {
  

  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const App = () => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get("name");

  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(9);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showMarker, setShowMarker] = useState(true);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}

          {showMarker && <VectorLayer source={vector({ features })} />}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      <div>
        <input
          type="checkbox"
          checked={showLayer1}
          id="marker1"
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        <label htmlFor="marker1">Mon Futur Travail</label>
      </div>
      <hr />
      <div>
        <input
          type="checkbox"
          checked={showMarker}
          id="marker"
          onChange={(event) => setShowMarker(event.target.checked)}
        />{" "}
        <label htmlFor="marker">Mon Bureau (zoomer avec la molette de la souris)</label> 
      </div>
      <div className="center">
      <p>Bienvenue {userName}</p>
      <NavLink to="/">
        <button className="button2">Déconnexion</button>
      </NavLink>
      </div>
    </div>
  );
};

export default App;
