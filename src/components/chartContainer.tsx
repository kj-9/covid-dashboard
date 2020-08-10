import React from 'react';
import { Group } from '@vx/group';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 50 };

export type ChartContainerProps = {
    width: number;
    height: number;
    margin?: { top: number; right: number; bottom: number; left: number };
    children: any;

    
  };
  
export default function chartContainer({
    width,
    height,
    margin = defaultMargin,
    children
  }: ChartContainerProps) {
    // bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
  
    // update scale output dimensions
    dateScale.rangeRound([0, yMax]);
    cityScale.rangeRound([0, dateScale.bandwidth()]);
    tempScale.rangeRound([0, xMax]);
  
  
    return <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
          {children}
      </Group>
    </svg>
  }