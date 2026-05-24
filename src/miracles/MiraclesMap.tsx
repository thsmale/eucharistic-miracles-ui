import { useContext } from "react"
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
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
  resetPosition,
  setCircleRadius,
  setPosition
} from '../redux/map';
import topology from "../world-topo.json"
import MarkerWithTooltip from './MiraclesMapMarker';
import { type MiracleMetadata } from "../data/types";

const getSmallScreenRadius = ({ zoom }: Position) => {
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
  return .05
}

const getRadius = ({ zoom }: Position) => {
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
  return .05;
}

type MiraclesByCoordinates = {
  coordinates: [number, number],
  miracle: Omit<MiracleMetadata, 'coordinates'>,
}

type MiraclesGroupedByCoordinates = {
  coordinates: [number, number],
  city: string,
  country: string,
  endpoint: string,
  miracles: Omit<MiracleMetadata, 'coordinates'>[],
}

type Position = {
  coordinates: [number, number],
  zoom: number,
}

type Props = {
  miracles: MiracleMetadata[]
}

export const MiraclesMap = ({ miracles }: Props) => {
  const size = useContext(ResponsiveContext);
  const dispatch = useAppDispatch();
  const circleRadius = useAppSelector(state => state.map.circleRadius);
  const posCoordinates = useAppSelector(state => state.map.coordinates);
  const posZoom = useAppSelector(state => state.map.zoom);
  const minZoom = 1;
  const maxZoom = 500;
  /**
   * A few miracles have multiple coordinates
   * Like Middleburg-Lovanio or Netherlands-Spain
   * Restructuring data to be array with one set of coordinates for each miracle
   */
  const miraclesByCoordinates: MiraclesByCoordinates[] = miracles.flatMap(({ coordinates, ...rest }) => 
    coordinates.map(coord => ({
      coordinates: coord,
      miracle: { ...rest }
    }))
  );
  /**
   * A few miracles occurred in the same location
   * Like 3 part series for Buenos Aires or 2 unique miracles in Rome
   * We will show one marker with references to all the miracles
   */
  const miraclesGroupedByCoordinates: MiraclesGroupedByCoordinates[] = Object.values(miraclesByCoordinates.reduce<Record<string, MiraclesGroupedByCoordinates>>((acc, current) => {
    // Used to find duplicate coordinates so they can be grouped
    const {
      coordinates,
      miracle,
    } = current;
    const coordKey = coordinates.join(',');

    if (acc[coordKey]) {
      acc[coordKey].miracles.push(miracle);
    } else {
      acc[coordKey] = {
        coordinates,
        city: miracle.city,
        country: miracle.country,
        endpoint: miracle.endpoint,
        miracles: [miracle]
      };
    }

    return acc;
  }, {}));

  const handleZoomIn = () => {
    if (posZoom >= maxZoom) return;
    dispatch(setPosition({
      coordinates: posCoordinates,
      zoom: posZoom * 2,
    }));
  }

  const handleZoomOut = () => {
    if (posZoom <= minZoom) return;
    dispatch(setPosition({
      coordinates: posCoordinates,
      zoom: posZoom / 2,
    }));
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
              zoom={posZoom}
              center={posCoordinates}
              minZoom={minZoom}
              maxZoom={maxZoom}
              onMoveEnd={(position) => { 
                const radius = size === 'small' ? getSmallScreenRadius(position) : getRadius(position);
                dispatch(setCircleRadius(radius));
                dispatch(setPosition(position));
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
              {miraclesGroupedByCoordinates.map((miracle) => (
                <MarkerWithTooltip 
                  key={miracle.coordinates.join(',')} 
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
              dispatch(resetPosition());
              dispatch(setCircleRadius(3));
            }} 
          />
        </Box>
      </Stack>
    </Box>
  )
}
