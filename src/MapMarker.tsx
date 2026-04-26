import React, { useRef, useState } from "react";
import {
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

  return (
    <>
      <Marker 
        coordinates={miracle.coordinates[0]} 
        ref={refs.setReference} 
        {...getReferenceProps()}
      >
        <circle r={circleRadius} fill="#F53" />
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
                        <Text>{`${miracle.city}, ${miracle.country}`}</Text>
                    </Box>
                    <Box direction="row" align="center" gap="xsmall">
                        <Calendar />
                        <Text>{miracle.year}</Text>
                    </Box>
                    <Box flex={false} align="start">
                    <Button
                        label='View details'
                        secondary
                        onClick={() => navigate(`${miracle.country}/${miracle.city}`, { state: { path: miracle.path }})}
                    />
                    </Box>
                </Box>
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default MarkerWithTooltip;