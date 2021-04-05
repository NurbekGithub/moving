import { chakra, ChakraProps } from "@chakra-ui/system";
import * as React from "react";

const SIDE_WIDTH = 35;
const VIEWPORT_WIDTH = 450;
const TOP_MARGIN = 5;
const LEFT_MARGIN = 40;
const RIGHT_MARGIN = 100;
const BOTTOM_MARGIN = 50; // для того чтобы поместились стрелки
const xStart = LEFT_MARGIN;
const xEnd = VIEWPORT_WIDTH - RIGHT_MARGIN;

const deepness = 70; //расстояние между горизонтальной линий нижней части до самой нижней точки

export type BoxSvgType = {
  l: number; // length
  h: number;
  w: number;
  chakraProps: ChakraProps;
};
export function BoxSVG(props: BoxSvgType) {
  const { l, w, h, chakraProps } = props;
  const xCenter = (l / (l + w)) * (xEnd - xStart) + xStart;
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
      {...chakraProps}
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
        strokeWidth={12}
        stroke="#000"
        fill="#fff"
        d={`
          M${xStart} ${botomXLine - heightInPixels}
          L${xCenter} ${botomXLine + deepness - heightInPixels}
          l${-SIDE_WIDTH} ${SIDE_WIDTH + 5}
          L${xStart - SIDE_WIDTH} ${botomXLine - heightInPixels + SIDE_WIDTH}
          z
        `}
      />
      <path
        strokeWidth={12}
        stroke="#000"
        fill="#fff"
        d={`
          M${xEnd} ${botomXLine - heightInPixels}
          L${xCenter} ${botomXLine + deepness - heightInPixels}
          l${SIDE_WIDTH} ${SIDE_WIDTH + 5}
          L${xEnd + SIDE_WIDTH} ${botomXLine - heightInPixels + SIDE_WIDTH}
          z
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
          m -1 -1
          l -20 -25
          z
          l -30 8
          M${xStart - 30} ${botomXLine + 20}
          m 1 1
          l 25 -10
          z
          l 15 24
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
          m -1 1
          l -20 -15
          z
          l -10 25
          M${xCenter + 30} ${botomXLine + deepness + 20}
          m 1 0
          l 20 -25
          z
          l 31 2
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
          M${xEnd + 50} ${botomXLine}
          L${xEnd + 50} ${botomXLine - heightInPixels}
          m 0 2
          l -15 15
          z
          l 15 15
          M${xEnd + 50} ${botomXLine}
          m 0 -2
          l 15 -15
          z
          l -15 -15
        `}
      />
      <path
        id="hArrow"
        fill="none"
        stroke="#000"
        strokeWidth={0}
        d={`
          M${xEnd + 85} ${botomXLine}
          L${xEnd + 85} ${botomXLine - heightInPixels}
        `}
      />
      <text fontSize="2em" dx="15">
        <textPath href="#hArrow">{h} см</textPath>
      </text>
    </chakra.svg>
  );
}
