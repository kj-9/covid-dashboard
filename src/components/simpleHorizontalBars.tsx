import React from 'react';
import { Group } from '@vx/group';
import SimpleHorizontalBar from './simpleHorizontalBars';
import SimpleDataScaler from './simpleDataScaler'
import { AxisLeft } from '@vx/axis';
import { SimpleDataType, SimpleKeyType, SimpleKey } from './simpleData'
import { BarGroupHorizontal, Bar } from '@vx/shape';



export default function SimpleHorizontalBars({
  width, height, margin,
  data, getX, y0Scale, y1Scale, xScale, colorScale, xMax, axisColor, tickFormat
}: SimpleDataScaler) {

  return <svg width={width} height={height}>
    <Group top={margin.top} left={margin.left}>
      <BarGroupHorizontal<SimpleDataType, SimpleKeyType>
        data={data}
        y0={getX}
        y0Scale={y0Scale}
        y1Scale={y1Scale}
        xScale={xScale}
        color={colorScale}
        keys={SimpleKey}
        width={xMax}
      >
        {barGroups =>
          barGroups.map(barGroup => (
            <Group
              key={`bar-group-horizontal-${barGroup.index}-${barGroup.y0}`}
              top={barGroup.y0}
            >
              {barGroup.bars.map(bar => (
                <Bar
                  key={`${barGroup.index}-${bar.index}-${bar.key}`}
                  x={bar.x}
                  y={bar.y}
                  width={bar.width}
                  height={bar.height}
                  fill={bar.color}
                  rx={4}
                />
              ))}
            </Group>
          ))
        }
      </BarGroupHorizontal>
      <AxisLeft
        scale={y0Scale}
        stroke={axisColor}
        tickStroke={axisColor}
        tickFormat={tickFormat}
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