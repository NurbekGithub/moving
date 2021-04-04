import { chakra, ChakraProps } from "@chakra-ui/system";
import * as React from "react";

const VIEWPORT_WIDTH = 450;
const TOP_MARGIN = 5;
const LEFT_MARGIN = 30;
const RIGHT_MARGIN = 80;
const BOTTOM_MARGIN = 50; // для того чтобы поместились стрелки
const xStart = LEFT_MARGIN;
const xEnd = VIEWPORT_WIDTH - RIGHT_MARGIN;

const l = 50;
const w = 50;
const h = 30;
const deepness = 70; //расстояние между горизонтальной линий нижней части до самой нижней точки

const xCenter = (l / (l + w)) * (xEnd - xStart) + xStart;
export function BoxSVG(props: ChakraProps) {
  const lengthInPixels = Math.sqrt(
    (xCenter - xStart) * (xCenter - xStart) + deepness * deepness
  );
  const hToL = h / l;
  const heightInPixels = lengthInPixels * hToL;
  const totalHeight =
    heightInPixels + 2 * deepness + BOTTOM_MARGIN + TOP_MARGIN;
  const botomXLine = totalHeight - BOTTOM_MARGIN - deepness;
  return (
    <chakra.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWPORT_WIDTH} ${totalHeight}`}
      {...props}
    >
      <path
        fill="none"
        stroke="#000"
        strokeWidth="12px"
        d={`
          M${xStart} ${botomXLine}
          L${xCenter} ${botomXLine + deepness}
          L${xEnd} ${botomXLine}
          M${xCenter} ${botomXLine + deepness}
          v${-heightInPixels}
          M${xEnd} ${botomXLine}
          v${-heightInPixels}
          M${xStart} ${botomXLine}
          v${-heightInPixels}
          L${xCenter} ${botomXLine - heightInPixels + deepness}
          L${xEnd} ${botomXLine - heightInPixels}
          L${xStart + xEnd - xCenter} ${botomXLine - heightInPixels - deepness}
          L${xStart} ${botomXLine - heightInPixels}
        `}
      />
      <path
        id="lArrow"
        fill="none"
        stroke="#000"
        strokeWidth={6}
        d={`
          M${xStart - 30} ${botomXLine + 20}
          L${xCenter - 30} ${botomXLine + deepness + 20}
          m -20 -25
          c 20 25 20 25 -10 35
          M${xStart - 30} ${botomXLine + 20}
          m 20 -15
          c -20 15 -20 15 -10 40
        `}
      />
      <text fontSize="2em" dx="30" dy="32">
        <textPath href="#lArrow">{l} см</textPath>
      </text>
      <path
        id="wArrow"
        fill="none"
        stroke="#000"
        strokeWidth={6}
        d={`
          M${xCenter + 30} ${botomXLine + deepness + 20}
          L${xEnd + 30} ${botomXLine + 20}
          m -20 -15
          c 20 15 20 15 10 45
          M${xCenter + 30} ${botomXLine + deepness + 20}
          m 20 -25
          c -20 25 -20 25 5 35
        `}
      />
      <text fontSize="2em" dy="32" dx="30">
        <textPath href="#wArrow">{w} см</textPath>
      </text>
      <path
        fill="none"
        stroke="#000"
        strokeWidth={6}
        d={`
          M${xEnd + 30} ${botomXLine}
          L${xEnd + 30} ${botomXLine - heightInPixels}
          m -15 15
          c 15 -15 15 -15 30 0
          M${xEnd + 30} ${botomXLine}
          m 15 -15
          c -15 15 -15 15 -30 0
        `}
      />
      <path
        id="hArrow"
        fill="none"
        stroke="#000"
        strokeWidth={0}
        d={`
          M${xEnd + 65} ${botomXLine}
          L${xEnd + 65} ${botomXLine - heightInPixels}
        `}
      />
      <text fontSize="2em" dx="15">
        <textPath href="#hArrow">{h} см</textPath>
      </text>
      {/* <path
        style={{
          textIndent: 0,
          textAlign: "start",
          lineHeight: "normal",
          textTransform: "none",
          marker: "none",
        }}
        d="
          M72 12
          L89.25 29
          H18
          A1 1 0 0 0 18 31
          h71.25
          L71.344 46.219
          a1 1 0 1 0 1.312 1.531
          l20-17
          a 1 1 0 0 0 0-1.531
          l-20-17
          "
        fontWeight={400}
        color="#000"
        strokeWidth={6}
      /> */}
    </chakra.svg>
  );
}
