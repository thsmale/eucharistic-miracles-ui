import React, { useContext, useState } from "react"
import {
  Box,
  Button,
  ResponsiveContext,
  Stack,
} from 'grommet';
import { ZoomIn, ZoomOut } from 'grommet-icons';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps"
import topology from "./world-topo.json"
import MarkerWithTooltip from './MiraclesMapMarker';

const getSmallScreenRadius = ({ zoom }) => {
  if (zoom < 3) {
    return 3;
  }
  if (zoom > 3 && zoom < 6) {
    return 2;
  }
  if (zoom > 6 && zoom < 12) {
    return 1;
  }
  if (zoom > 12 && zoom < 35) {
    return .5;
  }
  if (zoom > 35 && zoom < 75) {
    return .25;
  }
  if (zoom > 75 && zoom < 250) {
    return .10
  }
  if (zoom > 250) {
    return .05
  }
}

const getRadius = ({ zoom }) => {
  if (zoom < 3) {
    return 3;
  }
  if (zoom > 3 && zoom < 6) {
    return 2;
  }
  if (zoom > 6 && zoom < 12) {
    return 1;
  }
  if (zoom > 12 && zoom < 15) {
    return .5;
  }
  if (zoom > 15 && zoom < 35) {
    return .25;
  }
  if (zoom > 35 && zoom < 75) {
    return .10;
  }
  if (zoom > 75) {
    return .05;
  }
}


export const MiraclesMap = ({ miracles }) => {
  const size = useContext(ResponsiveContext);
  const defaultPosition = { coordinates: [0, 0], zoom: 1 };
  const [position, setPosition] = useState(defaultPosition)
  const [circleRadius, setCircleRadius] = useState(3);
  const minZoom = 1;
  const maxZoom = 500;

  const handleZoomIn = () => {
    if (position.zoom >= maxZoom) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }))
  }

  const handleZoomOut = () => {
    if (position.zoom <= minZoom) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }))
  }

  return (
    <Box
      pad={{ top: 'small' }}
      round='medium'
    >
      <Stack anchor='bottom-right'>
        <Box width="100%" height={size === 'small' ? 'medium' : "large"} round='medium'>
          <ComposableMap
            style={{
              background: '#EDEDED',
              borderRadius: '12px',
              width: '100%',
              height: '100%',
            }}
            projectionConfig={{ scale: 200 }}
          >
            <ZoomableGroup
              zoom={position.zoom}
              center={position.coordinates}
              minZoom={minZoom}
              maxZoom={maxZoom}
              onMoveEnd={(position) => { 
                const radius = size === 'small' ? getSmallScreenRadius(position) : getRadius(position);
                setCircleRadius(radius)
                setPosition(position)
              }}
            >
              <Geographies geography={topology}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#6FFFB0"
                      stroke="#000"
                      strokeWidth={.3}
                      style={{
                        default: {
                          fill: "#6FFFB0",
                          outline: "none"
                        },
                        hover: {
                          fill: "#6FFFB0",
                          outline: "none"
                        },
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
    </Box>
  )
}
