import React, { useRef, useState } from "react";
import {
  Anchor,
  Box,
  Button,
  Text,
} from 'grommet';
import { Location, Calendar } from "grommet-icons";
import { Marker } from "react-simple-maps";
import {
  arrow,
  offset,
  useFloating,
  useHover,
  useInteractions,
  safePolygon,
  FloatingArrow,
  FloatingPortal, // This is the fix for "Map Version"
} from "@floating-ui/react";
import { useNavigate } from 'react-router';

const MarkerWithTooltip = ({ miracle, circleRadius }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    middleware: [
      arrow({
        element: arrowRef,
      }),
      offset(8),
    ]
  });

  const hover = useHover(context, {
    handleClose: safePolygon(),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);
  const { coordinates, city, country, miracles } = miracle;

  return (
    <>
      <Marker 
        coordinates={coordinates} 
        ref={refs.setReference} 
        {...getReferenceProps()}
      >
        <circle r={circleRadius} fill="#7D4CDB" />
      </Marker>

      {/* The Portal ensures the tooltip sits on top of the Map container */}
      {isOpen && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
            }}
            {...getFloatingProps()}
          >
            <FloatingArrow ref={arrowRef} context={context} />
            <Box
              direction="column"
              gap='small'
              elevation='medium'
              background='background-front'
              pad='medium'
            >
              <Box direction="row" align="center" gap="xsmall">
                <Location />
                <Text>{`${city}, ${country}`}</Text>
              </Box>
              {miracles.length === 1 && (
                <Box gap='small'>
                  <Box direction="row" align="center" gap='xsmall'>
                    <Calendar />
                    <Text>{miracles[0].year}</Text>
                  </Box>
                  <Box flex={false} align="start">
                    <Button
                      label='View details'
                      secondary
                      onClick={() => 
                        navigate(`${country}/${city}/${miracles[0].year}`, {
                          state: { path: miracles[0].path }}
                        )}
                    />
                  </Box>
                </Box>
              )}
              {miracles.length > 1 && (
                <Box pad={{ left: 'medium' }}>
                  <ul style={{ marginTop: 0, marginBottom: 0, marginLeft: 0, paddingLeft: 0 }}>
                    {miracles.map(item  => {
                      const endpoint = `/${country}/${city}/${item.year}`;
                      return (
                        <li key={item.path}>
                          <Anchor
                            href={endpoint}
                            label={item.year}
                            onClick={(event) => {
                              event?.preventDefault();
                              navigate(endpoint, { state: { path: item.path }})
                            }}
                            // Cannot use as Link since tixtla and sokolka have same date
                          />
                        </li>
                      )
                    })}
                  </ul>
                </Box>
              )}
            </Box>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default MarkerWithTooltip;