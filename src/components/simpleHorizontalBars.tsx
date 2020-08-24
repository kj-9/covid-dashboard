import React from 'react';
import { Group } from '@vx/group';
import SimpleDataScaler from './simpleDataScaler'
import { AxisLeft, AxisTop } from '@vx/axis';
import { SimpleDataType, SimpleKeyType, SimpleKey } from './simpleData'
import { BarGroupHorizontal, Bar } from '@vx/shape';
import { useTooltip, Tooltip } from '@vx/tooltip';
import { localPoint } from '@vx/event';




export default function SimpleHorizontalBars({
  width, height, margin,
  data, getX, y0Scale, y1Scale, xScale, colorScale, xMax, axisColor, tickFormat
}: SimpleDataScaler) {
  
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();
  
  const handleMouseOver = (event, datum) => {
    const coords = localPoint(event.target.ownerSVGElement, event);
    showTooltip({
      tooltipLeft: coords.x,
      tooltipTop: coords.y,
      tooltipData: datum
    });
  };

  return <div style={{position:'relative'}}><svg width={width} height={height}>
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
                  onMouseOver={event => handleMouseOver(event, bar.value)}
                  onMouseOut={hideTooltip}
                />
              ))}
            </Group>
          ))
        }
      </BarGroupHorizontal>
      <AxisTop
        scale={xScale}
        tickValues={xScale.ticks(5)}
        tickLabelProps={() => ({
          textAnchor: 'middle',
          dy: '-.33em',
          fontSize: 13,
        })}
      />
      <AxisLeft
        scale={y0Scale}
        stroke={axisColor}
        tickStroke={axisColor}
        tickFormat={tickFormat}
        hideAxisLine={false}
        numTicks={data.length}
        tickLabelProps={() => ({
          fill: axisColor,
          fontSize: 15,
          textAnchor: 'end',
          dy: '.33em',
        })}
      />
    </Group>
  </svg>
  {tooltipOpen && (
        <Tooltip
          // set this to random so it correctly updates with parent bounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          <strong>{tooltipData}</strong>
        </Tooltip>
      )}
  </div>
}