import React, { useState } from "react";
import { Marker } from "react-simple-maps";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useInteractions,
  safePolygon,
  FloatingPortal, // This is the fix for "Map Version"
} from "@floating-ui/react";

const MarkerWithTooltip = ({ miracle, circleRadius }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [offset(8), flip(), shift()],
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
              backgroundColor: "#333",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "14px",
              zIndex: 9999, // High z-index to stay above the map
            }}
            {...getFloatingProps()}
          >
            {`${miracle.city}, ${miracle.country}`}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

/*
import React, { useState } from "react";
import { Marker } from "react-simple-maps";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  safePolygon,
  shift,
  useHover,
  useInteractions,
} from "@floating-ui/react";

function MapMarker({ miracle }) {

  const [isOpen, setIsOpen] = useState(false);

  // Initialize Floating UI
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10), // Space between marker and tooltip
      flip(),     // Flips to bottom if top is crowded
      shift(),    // Slides left/right to stay in view
    ],
  });

  // Define the hover interaction
  const hover = useHover(context, {
  // This is the magic line:
    handleClose: safePolygon(), 
    // Optional: add a tiny delay so it feels smoother
    delay: { open: 50, close: 100 }, 
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <>
      <Marker 
        coordinates={miracle.coordinates[0]} 
        ref={refs.setReference} 
        {...getReferenceProps()}
      >
        <circle r={4} fill="#F53" />
      </Marker>

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            backgroundColor: "black",
            color: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            zIndex: 1000,
            // Ensure pointer events are enabled
            pointerEvents: "auto",
          }}
          {...getFloatingProps()}
        >
          Hello World
        </div>
      )}
    </>
  );
}
*/

export default MarkerWithTooltip;