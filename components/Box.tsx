import { chakra, ChakraComponent } from "@chakra-ui/system";
import * as React from "react";

export function BoxSVG(props: ChakraComponent<"svg", {}>) {
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 450.001 450.001"
      {...props}
    >
      <path d="M448.554 177.103l-42.175-56.339c-.011-.015-.93-1.647-3.762-2.548L226.973 68.62a7.266 7.266 0 00-3.946 0L47.383 118.216s-2.398.692-3.839 2.637c-.577.779-42.097 56.25-42.097 56.25a7.262 7.262 0 003.479 11.224l37.171 12.615v100.874a7.256 7.256 0 004.487 6.707l175.645 72.581c.522.216 1.184.551 2.771.551s2.771-.551 2.771-.551l175.646-72.581a7.256 7.256 0 004.486-6.707V200.94l37.171-12.615a7.264 7.264 0 004.601-4.725 7.264 7.264 0 00-1.121-6.497zm-429.492.691l33.138-44.28 13.403 3.692 75.431 20.778 71.335 19.652-41.837 51.565-151.47-51.407zm198.681 185.748l-161.13-66.581v-91.094l114.04 38.708a7.25 7.25 0 007.967-2.302l39.124-48.219-.001 169.488zM225 166.062L76.37 125.116 225 83.146l148.63 41.97L225 166.062zm168.388 130.899l-161.131 66.581V194.056l39.124 48.219a7.256 7.256 0 007.968 2.302l114.039-38.708v91.092zm-113.919-67.758l-41.837-51.565 160.169-44.124 33.139 44.28-151.471 51.409z" />
      <defs>
        <marker
          id="prefix__a"
          markerWidth={10}
          markerHeight={7}
          refX={0}
          refY={3.5}
          orient="auto"
        >
          <path d="M0 0l10 3.5L0 7z" />
        </marker>
      </defs>
      <path
        stroke="#000"
        strokeWidth={8}
        markerEnd="url(#prefix__a)"
        d="M0 350h250"
      />
    </chakra.svg>
  );
}
