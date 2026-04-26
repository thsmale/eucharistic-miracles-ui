import React, { useState, } from "react"
import { Box, Button, Stack } from 'grommet';
import { ZoomIn, ZoomOut } from 'grommet-icons';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"
import topology from "./world-topo.json"
import MarkerWithTooltip from './MapMarker';


function MapChart({ setToolTipContent, miracles }) {
  const defaultPosition = { coordinates: [0, 0], zoom: 1 };
  const [position, setPosition] = useState(defaultPosition)
  const [circleRadius, setCircleRadius] = useState(3);
  const minZoom = 1;
  const maxZoom = 50;

  const handleZoomIn = () => {
    if (position.zoom >= maxZoom) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= minZoom) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }))
  }

  return (
    <Stack anchor='bottom-right'>
      <Box width="100%" height="large">
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
            minZoom={minZoom}
            maxZoom={maxZoom}
            onMoveEnd={(position) => { 
              setPosition(position)
              console.log(position.zoom);
              if (position.zoom < 3) {
                setCircleRadius(3)
              }
              if (position.zoom > 3 && position.zoom < 6) {
                setCircleRadius(2);
              }
              if (position.zoom > 6 && position.zoom < 12) {
                setCircleRadius(1);
              }
              if (position.zoom > 12 && position.zoom < 15) {
                setCircleRadius(.5);
              }
              if (position.zoom > 15 && position.zoom < 23) {
                setCircleRadius(.25);
              }
              if (position.zoom > 23 && position.zoom < 35) {
                setCircleRadius(.10)
              }
              if (position.zoom > 35) {
                setCircleRadius(.05)
              }
            }}
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
                      default: {
                        fill: "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "#D6D6DA",
                        outline: "none"
                      },
                    /*
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                        */
                    }}
                  />
                ))
              }
            </Geographies>
            {miracles.map((miracle, index) => (
              <MarkerWithTooltip 
                key={index} 
                miracle={miracle}
                circleRadius={circleRadius}
              />
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </Box>
      <Box className='controls' direction='column' gap='xsmall' pad='small' align='center'>
        <Box gap='none'>
          <Button icon={<ZoomIn />} onClick={handleZoomIn} />
          <Button icon={<ZoomOut />} onClick={handleZoomOut} />
        </Box>
        <Button
          label="Reset"
          onClick={() => {
            setPosition(defaultPosition)
            setCircleRadius(3);
          }} 
        />
      </Box>

    </Stack>

  )
}

export default MapChart;