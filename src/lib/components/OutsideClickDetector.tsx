"use client";
import React, { useRef, useEffect, RefObject, ReactNode } from "react";

// Source: https://stackoverflow.com/a/42234988/

interface OutsideClickDetectorProps {
  onClickOutside: () => void;
  onClick: () => void;
  includeRefs: RefObject<HTMLElement>[];
  detectEscape: boolean;
}

/**
 * Hook that alerts clicks outside of the passed ref.
 *
 * @param ref The ref to the element to detect clicks outside of.
 * @param onClick The function to call when a click occurs anywhere.
 * @param onClickOutside The function to call when a click outside occurs outside of the element.
 * @param detectEscape Whether to detect the escape key.
 * @param includeRefs An array of refs to exclude in the regular click detection.
 */
function useOutsideAlerter({
  ref,
  onClick,
  onClickOutside,
  detectEscape = false,
  includeRefs = [],
}: OutsideClickDetectorProps & { ref: RefObject<HTMLElement> }) {
  useEffect(() => {
    function handleClick(event: Event) {
      if (includeRefs.some((r) => r.current?.contains(event.target as Node)))
        return;
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside?.();
      }
      onClick?.();
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === "Enter") {
        handleClick(event);
      } else if (detectEscape && event.code === "Escape") {
        onClickOutside?.();
        onClick?.();
      }
    }
    document.addEventListener("pointerup", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerup", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, detectEscape, onClick, onClickOutside, includeRefs]);
}

/**
 * Component that alerts if you click outside of it
 *
 * @param children The children to render
 * @param onClickOutside The function to call when a click outside occurs outside of the children
 * @param onClick The function to call when a click occurs anywhere
 * @param includeRefs An array of refs to exclude in the click detection
 */
export default function OutsideClickDetector({
  children,
  onClickOutside,
  onClick,
  includeRefs = [],
  detectEscape = false,
}: {
  children: ReactNode;
} & Partial<OutsideClickDetectorProps>) {
  const wrapperRef = useRef(null);
  useOutsideAlerter({
    ref: wrapperRef,
    onClickOutside: onClickOutside ?? (() => {}),
    onClick: onClick ?? (() => {}),
    includeRefs,
    detectEscape,
  });

  return <div ref={wrapperRef}>{children}</div>;
}
