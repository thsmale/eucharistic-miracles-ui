import React, { useRef, useState } from "react";
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

const MarkerWithTooltip = ({ miracle, circleRadius }) => {
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
              backgroundColor: "#333",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
            {...getFloatingProps()}
          >
            <FloatingArrow ref={arrowRef} context={context} />
            {`${miracle.city}, ${miracle.country}`}
          </div>
        </FloatingPortal>
      )}
    </>
  );
};

export default MarkerWithTooltip;