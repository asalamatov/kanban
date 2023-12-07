'use client';
import { use, useEffect, useState } from "react";

type WindowDimension = {
  width: number | undefined;
  height: number | undefined;
};

type WindowDimensionReturn = [
  WindowDimension['width'],
  WindowDimension['height']
];

const useWindowDimension = (): WindowDimensionReturn => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimension>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return [windowDimensions.width, windowDimensions.height];
}

export default useWindowDimension;