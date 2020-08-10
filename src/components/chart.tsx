import React from 'react';
import { Group } from '@vx/group';
import { AxisLeft } from '@vx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';

import SimpleHorizontalBar from './simpleHorizontalBars'

export type BarGroupHorizontalProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
};


const blue = '#aeeef8';
export const green = '#e5fd3d';
const purple = '#9caff6';
export const background = '#612efb';
const defaultMargin = { top: 20, right: 20, bottom: 20, left: 50 };

const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);
function max<D>(arr: D[], fn: (d: D) => number) {
  return Math.max(...arr.map(fn));
}




type dataType = {
  x: string;
  y: number;
}

const data: dataType[] = [
  { x: "2019-01-01", y: 123 },
  { x: "2019-02-02", y: 123 },
  { x: "2019-03-03", y: 1223 },
  { x: "2019-04-04", y: 1213 },

]

type keyTypeY = 'y';
const keys = ['y'] as keyTypeY[];


// accessors
const getDate = (d: dataType) => d.x;

// scales
const dateScale = scaleBand<string>({
  domain: data.map(getDate),
  padding: 0.2,
});
const cityScale = scaleBand<string>({
  domain: keys,
  padding: 0.1,
});
const tempScale = scaleLinear<number>({
  domain: [0, max(data, d => max(keys, key => Number(d[key])))],
});
const colorScale = scaleOrdinal<string, string>({
  domain: keys,
  range: [blue, green, purple],
});



export default function Example({
  width,
  height,
  margin = defaultMargin,
}: BarGroupHorizontalProps) {
  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  dateScale.rangeRound([0, yMax]);
  cityScale.rangeRound([0, dateScale.bandwidth()]);
  tempScale.rangeRound([0, xMax]);


  return <svg width={width} height={height}>
    <Group top={margin.top} left={margin.left}>
      <SimpleHorizontalBar
        data={data}
        width={xMax}
        y0={getDate}
        y0Scale={dateScale}
        y1Scale={cityScale}
        xScale={tempScale}
        color={colorScale}
      />
      <AxisLeft
        scale={dateScale}
        stroke={green}
        tickStroke={green}
        tickFormat={formatDate}
        hideAxisLine
        tickLabelProps={() => ({
          fill: green,
          fontSize: 11,
          textAnchor: 'end',
          dy: '0.33em',
        })}
      />
    </Group>
  </svg>
}