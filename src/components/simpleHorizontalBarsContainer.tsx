import React from 'react';
import { Group } from '@vx/group';
import SimpleHorizontalBar from './simpleHorizontalBars';
import SimpleDataScaler from './simpleDataScaler'
import { AxisLeft } from '@vx/axis';
import { timeParse, timeFormat } from 'd3-time-format';

const axisColor = '#e5fd3d';
const parseDate = timeParse('%Y-%m-%d');
const format = timeFormat('%b %d');
const formatDate = (date: string) => format(parseDate(date) as Date);

export default function SimpleHorizontalBarsContainer({
  width, height, margin, 
  data, getX, y0Scale, y1Scale, xScale, colorScale, xMax
}: SimpleDataScaler) {

  //
  return <svg width={width} height={height}>
    <Group top={margin.top} left={margin.left}>
      <SimpleHorizontalBar
        data={data}
        width={xMax}
        y0={getX}
        y0Scale={y0Scale}
        y1Scale={y1Scale}
        xScale={xScale}
        color={colorScale}
      />
      <AxisLeft
        scale={y0Scale}
        stroke={axisColor}
        tickStroke={axisColor}
        tickFormat={formatDate}
        hideAxisLine
        tickLabelProps={() => ({
          fill: axisColor,
          fontSize: 11,
          textAnchor: 'end',
          dy: '0.33em',
        })}
      />
    </Group>
  </svg>
}