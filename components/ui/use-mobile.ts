import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const { width } = useWindowDimensions();
  const [isMobile, setIsMobile] = useState<boolean>(width < MOBILE_BREAKPOINT);

  useEffect(() => {
    setIsMobile(width < MOBILE_BREAKPOINT);
  }, [width]);

  return isMobile;
}
