import * as React from "react";

const SIDE_WIDTH = 35;
const VIEWPORT_WIDTH = 450;
const TOP_MARGIN = 50;
const LEFT_MARGIN = 100;
const RIGHT_MARGIN = 150;
const BOTTOM_MARGIN = 100; // для того чтобы поместились стрелки
const xStart = LEFT_MARGIN;
const xEnd = VIEWPORT_WIDTH - RIGHT_MARGIN;

const deepness = 70; //расстояние между горизонтальной линий нижней части до самой нижней точки

export type BoxSvgType = {
  l: number; // length
  h: number;
  w: number;
};
export function BoxSVG(props: BoxSvgType) {
  const { l, w, h } = props;
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEWPORT_WIDTH} ${totalHeight}`}
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
          v${-heightInPixels - deepness / 2.25}
          M${xEnd} ${botomXLine}
          v${-heightInPixels}
          M${xStart} ${botomXLine}
          v${-heightInPixels}
          L${xCenter} ${botomXLine - heightInPixels + deepness / 1.5}
          L${xEnd} ${botomXLine - heightInPixels}
          L${xStart + xEnd - xCenter} ${
          botomXLine - heightInPixels - deepness / 1.5
        }
          L${xStart} ${botomXLine - heightInPixels}
        `}
      />
      <path
        strokeWidth={12}
        stroke="#000"
        fill="#fff"
        d={`
          M${xStart} ${botomXLine - heightInPixels}
          L${xCenter} ${botomXLine + deepness / 1.5 - heightInPixels}
          l${-SIDE_WIDTH} ${SIDE_WIDTH + 20}
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
          L${xCenter} ${botomXLine + deepness / 1.5 - heightInPixels}
          l${SIDE_WIDTH} ${SIDE_WIDTH + 20}
          L${xEnd + SIDE_WIDTH} ${botomXLine - heightInPixels + SIDE_WIDTH}
          z
        `}
      />
      <path
        id={`lArrow-${l}-${w}-${h}`}
        fill="none"
        stroke="#000"
        strokeWidth={6}
        d={`
          M${xStart - 50} ${botomXLine + 30}
          L${xCenter - 20} ${botomXLine + deepness + 40}
          m -1 -1
          l -20 -25
          z
          l -30 -2
          M${xStart - 50} ${botomXLine + 30}
          m 1 1
          l 25 0
          z
          l 15 24
        `}
      />
      <path
        id={`lArrowText-${l}-${w}-${h}`}
        fill="none"
        stroke="none"
        d={`
          M${xStart - 50} ${botomXLine + 75}
          L${xCenter - 20} ${botomXLine + deepness + 75}
        `}
      />
      <text fontSize="2em">
        <textPath href={`#lArrowText-${l}-${w}-${h}`}>{l} см</textPath>
      </text>
      <path
        id={`wArrow-${l}-${w}-${h}`}
        fill="none"
        stroke="#000"
        strokeWidth={6}
        d={`
          M${xCenter + 20} ${botomXLine + deepness + 40}
          L${xEnd + 50} ${botomXLine + 20}
          m -1 1
          l -20 -5
          z
          l -10 25
          M${xCenter + 20} ${botomXLine + deepness + 40}
          m 1 0
          l 18 -26
          z
          l 28 -6
        `}
      />
      <text fontSize="2em" dy="32" dx="30">
        <textPath href={`#wArrow-${l}-${w}-${h}`}>{w} см</textPath>
      </text>
      <path
        id={`hArrow-${l}-${w}-${h}`}
        fill="none"
        stroke="#000"
        strokeWidth={6}
        d={`
          M${xEnd + 55} ${botomXLine + 10}
          v -120
          m 0 2
          l -15 15
          z
          l 15 15
          M${xEnd + 55} ${botomXLine + 10}
          m 0 -2
          l 15 -15
          z
          l -15 -15
        `}
      />
      <text fontSize="2em" dy="42" dx="22">
        <textPath href={`#hArrow-${l}-${w}-${h}`}>{h} см</textPath>
      </text>
    </svg>
  );
}
