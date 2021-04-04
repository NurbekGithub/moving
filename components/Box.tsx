import { chakra, ChakraComponent, ChakraProps } from "@chakra-ui/system";
import * as React from "react";

export function BoxSVG(props: ChakraProps) {
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 450 450"
      {...props}
    >
      <path
        d="
        M 448 177
        l -42 -56
        L 226 68 47 118
        l -46 64 43 23
        v 101
        l 185 79 180 -79
        V 201
        l 37 -12 4 -4 -1 -6
        m -429 1
        l 33 -44 13 4 75 21 71 19 -42 51 -151 -51
        m 198 185
        l -161 -66
        v -91
        l 114 39 8 -2 39 -48 0 169
        M 225 166
        L 76.37 125 225 83
        l 148 42
        L 225 166
        m 168 131
        l -161 66
        V 194
        l 39 48 8 2 114 -39
        v 91
        m -114 -68
        l -42 -51 160 -44 33 44 -151 51"
      />
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
