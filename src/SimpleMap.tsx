import React, { useState } from "react"
import { Box, Button } from 'grommet';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps"
import topology from "./world-topo.json"


export default function MapChart() {
  const defaultPosition = { coordinates: [0, 0], zoom: 1 };
  const [position, setPosition] = useState(defaultPosition)
  return (
    <Box width="100%" height="xxlarge">
      <ComposableMap
        style={{ background: 'grey', /*width: "100%", height: "100%"*/ }}
        projectionConfig={{ scale: 200 }}
        //width={1440}
        //height={1500}
        /*
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-10.0, -53.0, 0],
          center: [0, 3],
          scale: 1200,
        }}
        */
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          minZoom={1}
          maxZoom={20}
          //onMoveEnd={(position) => setPosition(position)}
        >
          <Geographies geography={topology}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2a354d"
                  stroke="#000"
                  strokeWidth={.3}
                  style={{
                    /*
                     * rm the box when clicking, used for accessibility.
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" } // This removes the box when clicked
                    */
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className='controls'>
        <Button label="Reset" onClick={() => setPosition(defaultPosition)} />
      </div>
    </Box>
  )
}
